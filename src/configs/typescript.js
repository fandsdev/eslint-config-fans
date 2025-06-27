import pluginTypescript from '@typescript-eslint/eslint-plugin'
import parserTypescript from '@typescript-eslint/parser'
import process from 'node:process'
import { GLOB_TESTS, GLOB_TS } from '../globs.js'
import { defineConfig } from '../utils/index.js'
import { javascript } from './javascript.js'

export function typescript(options = {}) {
	const { extraFileExtensions = [], strict } = options
	const files = [
		GLOB_TS,
		...extraFileExtensions.map(ext => `**/*${ext}`),
	]

	return defineConfig([
		{
			name: 'fans/typescript',
			files,
			languageOptions: {
				parser: parserTypescript,
				parserOptions: {
					sourceType: 'module',
					tsconfigRootDir: process.cwd(),
					projectService: true,
					extraFileExtensions,
				},
			},
			plugins: {
				'@typescript-eslint': pluginTypescript,
			},
			rules: {
				...javascript().rules,

				// Disabled JavaScript rules
				'init-declarations': 'off',
				'no-redeclare': 'off',
				'no-undef': 'off',

				...pluginTypescript.configs.recommended.rules,
				...pluginTypescript.configs.stylistic.rules,

				...strict
					? {
							...pluginTypescript.configs['stylistic-type-checked'].rules,

							// Disabled
							'@typescript-eslint/consistent-type-definitions': 'off',
							'@typescript-eslint/prefer-nullish-coalescing': 'off',

							// Improvements
							'@typescript-eslint/array-type': ['error', {
								default: 'array-simple',
							}],
						}
					: {},

				// Disabled
				'@typescript-eslint/no-empty-function': 'off',

				// Improvements
				'@typescript-eslint/no-misused-promises': ['error', {
					checksVoidReturn: false,
				}],
				'@typescript-eslint/no-unused-expressions': ['error', {
					allowTernary: true,
				}],
			},
		},
		{
			name: 'fans/typescript/testing',
			files: GLOB_TESTS,
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
			},
		},
	])
}
