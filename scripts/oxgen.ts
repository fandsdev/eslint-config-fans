#!/usr/bin/env node

import { exec } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

function parseOutput(output: string): string[] {
	const lines = output.split('\n')
	const rules: string[] = []

	for (const line of lines) {
		const trimmed = line.trim()

		if (trimmed.includes('unsupported rule, but in development:')) {
			const ruleName = trimmed.replace('unsupported rule, but in development:', '').trim()
			if (ruleName) {
				rules.push(`- \`${ruleName}\` *(in development)*`)
			}
		} else if (trimmed.includes('unsupported rule:')) {
			const ruleName = trimmed.replace('unsupported rule:', '').trim()
			if (ruleName) {
				rules.push(`- \`${ruleName}\``)
			}
		}
	}

	return rules
}

async function generateRules(): Promise<void> {
	try {
		const documentationDirectory = path.join(process.cwd(), 'docs/oxlint')
		if (!existsSync(documentationDirectory)) {
			mkdirSync(documentationDirectory, { recursive: true })
		}

		let output = ''
		const result = await execAsync('pnpx @oxlint/migrate ./eslint-oxlint.config.js')
		output = String(result.stdout) + '\n' + String(result.stderr)

		const rules = parseOutput(output)

		if (rules.length === 0) {
			console.warn('No unsupported rules found')
			return
		}

		const markdown = `# Oxlint Unsupported Rules

${rules.join('\n')}
`

		const outputPath = path.join(documentationDirectory, 'UNSUPPORTED-RULES.md')
		writeFileSync(outputPath, markdown, 'utf8')
	} catch (error) {
		console.error('Error generating oxlint rules:', error)
		process.exit(1)
	}
}

await generateRules()

export { generateRules }
