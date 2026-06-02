#!/usr/bin/env node

import { exec } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

const SKIPPED_REGEX = /Skipped (\d+) rules:/
const NURSERY_REGEX = /- \d+ Nursery/
const UNSUPPORTED_REGEX = /- \d+ Unsupported/
const DIGIT_REGEX = /^\d+/

interface ParsedRules {
	nursery: string[]
	unsupported: string[]
	totalSkipped: number
}

function parseOutput(output: string): ParsedRules {
	const lines = output.split('\n')
	const nursery: string[] = []
	const unsupported: string[] = []

	let currentSection: 'none' | 'nursery' | 'unsupported' = 'none'
	let totalSkipped = 0

	for (const line of lines) {
		const trimmed = line.trim()

		// Parse total skipped count
		const skippedMatch = SKIPPED_REGEX.exec(trimmed)
		if (skippedMatch) {
			totalSkipped = Number.parseInt(skippedMatch[1]!, 10)
			continue
		}

		// Detect section headers
		if (NURSERY_REGEX.test(trimmed)) {
			currentSection = 'nursery'
			continue
		}

		if (UNSUPPORTED_REGEX.test(trimmed)) {
			currentSection = 'unsupported'
			continue
		}

		// Parse rule names
		if (trimmed.startsWith('- ') && currentSection !== 'none') {
			const ruleName = trimmed.slice(2).trim()
			if (ruleName && !DIGIT_REGEX.test(ruleName)) {
				if (currentSection === 'nursery') {
					nursery.push(ruleName)
				} else if (currentSection === 'unsupported') {
					unsupported.push(ruleName)
				}
			}
		}
	}

	return { nursery, unsupported, totalSkipped }
}

// @oxlint/migrate derives JS plugin names from ESLint aliases using the
// `eslint-plugin-{alias}` convention, which doesn't match scoped packages.
const JS_PLUGIN_NAME_MAP: Record<string, string> = {
	'eslint-plugin-e18e': '@e18e/eslint-plugin',
}

function patchOxlintrc(): void {
	const oxlintrcPath = path.join(process.cwd(), '.oxlintrc.json')
	const content = readFileSync(oxlintrcPath, 'utf8')
	const patched = Object.entries(JS_PLUGIN_NAME_MAP).reduce(
		(acc, [from, to]) => acc.replaceAll(`"${from}"`, `"${to}"`),
		content,
	)
	if (patched !== content) {
		writeFileSync(oxlintrcPath, patched, 'utf8')
		// oxlint-disable-next-line no-console
		console.log('✅ Patched jsPlugins package names in .oxlintrc.json')
	}
}

async function generateRules(): Promise<void> {
	try {
		const documentationDirectory = path.join(process.cwd(), 'docs/oxlint')
		if (!existsSync(documentationDirectory)) {
			mkdirSync(documentationDirectory, { recursive: true })
		}

		let output = ''
		const result = await execAsync(
			'pnpm dlx @oxlint/migrate ./scripts/eslint-no-oxlint.config.js --type-aware --js-plugins --details',
		)
		output = String(result.stdout) + '\n' + String(result.stderr)

		patchOxlintrc()

		const parsed = parseOutput(output)

		if (parsed.nursery.length === 0 && parsed.unsupported.length === 0) {
			console.warn('No skipped rules found')
			return
		}

		const totalRules = parsed.nursery.length + parsed.unsupported.length

		let markdown = `# Oxlint Unsupported Rules

This document lists ESLint rules that are currently skipped by oxlint migration.

## Summary

- **Total skipped:** ${parsed.totalSkipped} rules
- **Nursery:** ${parsed.nursery.length} rules
- **Unsupported:** ${parsed.unsupported.length} rules
`

		if (parsed.nursery.length > 0) {
			markdown += `\n## Nursery Rules (In Development)

These rules are currently being developed and will be available in future versions:

${parsed.nursery.map(rule => `- \`${rule}\``).join('\n')}
`
		}

		if (parsed.unsupported.length > 0) {
			markdown += `\n## Unsupported Rules

These rules are not yet supported by oxlint:

${parsed.unsupported.map(rule => `- \`${rule}\``).join('\n')}
`
		}

		const outputPath = path.join(documentationDirectory, 'UNSUPPORTED-RULES.md')
		writeFileSync(outputPath, markdown, 'utf8')

		// oxlint-disable-next-line no-console
		console.log(
			`✅ Generated UNSUPPORTED-RULES.md with ${totalRules} rules (${parsed.nursery.length} nursery, ${parsed.unsupported.length} unsupported)`,
		)
	} catch (error) {
		console.error('Error generating oxlint rules:', error)
		process.exit(1)
	}
}

await generateRules()

export { generateRules }
