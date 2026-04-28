import pluginUnicorn from 'eslint-plugin-unicorn'
import {
	GLOB_ASTRO,
	GLOB_ASTRO_PAGES,
	GLOB_STORYBOOK,
	GLOB_TESTS,
	GLOB_VUE,
} from '../globs.js'
import { defineConfig } from '../utils/index.js'

const E18E_IGNORE_PATTERN = /e18e/i

export function unicorn(options = {}) {
	const { opinionated = true } = options

	return defineConfig([
		{
			name: 'fans/unicorn',
			plugins: {
				unicorn: pluginUnicorn,
			},
			rules: {
				...pluginUnicorn.configs.recommended.rules,

				// Disabled
				'unicorn/consistent-function-scoping': 'off',
				'unicorn/explicit-length-check': 'off',
				'unicorn/prefer-global-this': 'off',
				'unicorn/prefer-dom-node-dataset': 'off',
				'unicorn/no-array-reduce': 'off',
				'unicorn/no-null': 'off',
				'unicorn/no-array-callback-reference': 'off',
				'unicorn/no-object-as-default-parameter': 'off',
				'unicorn/no-abusive-eslint-disable': 'off',

				// Improvements
				'unicorn/prefer-ternary': ['error', 'only-single-line'],
				'unicorn/prevent-abbreviations': [
					'error',
					{
						ignore: [E18E_IGNORE_PATTERN],
						replacements: {
							acc: false,
							arg: false,
							args: false,
							attrs: false,
							e18e: false,
							el: false,
							env: false,
							ext: false,
							fn: false,
							param: false,
							params: false,
							prev: false,
							props: false,
							ref: false,
							refs: false,
							src: false,
							utils: false,
						},
					},
				],
				'unicorn/no-useless-undefined': [
					'error',
					{
						checkArguments: false,
					},
				],

				// Additional
				'unicorn/better-regex': 'error',
				'unicorn/custom-error-definition': 'error',
				'unicorn/prefer-import-meta-properties': 'error',
				'unicorn/prefer-json-parse-buffer': 'error',

				...(opinionated
					? {}
					: {
							'unicorn/no-array-for-each': 'off',
							'unicorn/no-useless-undefined': 'off',
							'unicorn/filename-case': 'off',
						}),
			},
		},

		{
			name: 'fans/unicorn/vue',
			files: [GLOB_VUE],
			rules: opinionated
				? {
						'unicorn/filename-case': [
							'error',
							{
								case: 'pascalCase',
							},
						],
					}
				: {},
		},

		{
			name: 'fans/unicorn/astro',
			files: [GLOB_ASTRO],
			rules: opinionated
				? {
						'unicorn/filename-case': [
							'error',
							{
								case: 'pascalCase',
							},
						],
					}
				: {},
		},
		{
			name: 'fans/unicorn/astro/pages',
			files: [GLOB_ASTRO_PAGES],
			rules: opinionated
				? {
						'unicorn/filename-case': [
							'error',
							{
								case: 'camelCase',
							},
						],
					}
				: {},
		},

		{
			name: 'fans/unicorn/storybook',
			files: [GLOB_STORYBOOK],
			rules: opinionated
				? {
						'unicorn/filename-case': [
							'error',
							{
								case: 'pascalCase',
							},
						],
					}
				: {},
		},

		{
			name: 'fans/unicorn/testing',
			files: GLOB_TESTS,
			rules: opinionated
				? {
						'unicorn/filename-case': 'off',
					}
				: {},
		},
	])
}
