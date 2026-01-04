import parserTypescript from '@typescript-eslint/parser'
import parserAstro from 'astro-eslint-parser'
import pluginAstro from 'eslint-plugin-astro'
import { GLOB_ASTRO } from '../globs.js'
import { defineConfig } from '../utils/index.js'

export function astro(options = {}) {
	const { typescript = false, useStylistic = false } = options

	return defineConfig([
		{
			name: 'fans/astro',
			files: [GLOB_ASTRO],
			plugins: {
				astro: pluginAstro,
			},
			languageOptions: {
				globals: pluginAstro.environments.astro.globals,
				parser: parserAstro,
				parserOptions: {
					extraFileExtensions: ['.astro'],
					parser: typescript ? parserTypescript : undefined,
				},
				sourceType: 'module',
			},
			processor: typescript ? 'astro/client-side-ts' : 'astro/astro',
			rules: {
				// Recommended rules
				'astro/missing-client-only-directive-value': 'error',
				'astro/no-conflict-set-directives': 'error',
				'astro/no-deprecated-astro-canonicalurl': 'error',
				'astro/no-deprecated-astro-fetchcontent': 'error',
				'astro/no-deprecated-astro-resolve': 'error',
				'astro/no-deprecated-getentrybyslug': 'error',
				'astro/no-unused-define-vars-in-style': 'error',
				'astro/valid-compile': 'error',

				...typescript
					? {
							'@typescript-eslint/no-deprecated': 'off',
						}
					: {},

				...useStylistic
					? {
							'@stylistic/jsx-one-expression-per-line': 'off',
						}
					: {},
			},
		},
	])
}
