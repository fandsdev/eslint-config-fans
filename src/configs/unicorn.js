import pluginUnicorn from 'eslint-plugin-unicorn'
import { GLOB_ASTRO, GLOB_STORYBOOK, GLOB_TESTS, GLOB_VUE } from '../globs.js'
import { defineConfig } from '../utils/index.js'

export function unicorn(options = {}) {
	const { strict } = options

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
				'unicorn/no-array-reduce': 'off',
				'unicorn/no-null': 'off',
				'unicorn/no-array-callback-reference': 'off',
				'unicorn/no-object-as-default-parameter': 'off',
				'unicorn/no-abusive-eslint-disable': 'off',

				// Improvements
				'unicorn/prevent-abbreviations': ['error', {
					replacements: {
						arg: false,
						args: false,
						attrs: false,
						el: false,
						env: false,
						ext: false,
						param: false,
						params: false,
						props: false,
						ref: false,
						refs: false,
						src: false,
						utils: false,
					},
				}],
				'unicorn/no-useless-undefined': ['error', {
					checkArguments: false,
				}],

				// Additional
				'unicorn/better-regex': 'error',
				'unicorn/custom-error-definition': 'error',
				'unicorn/prefer-import-meta-properties': 'error',
				'unicorn/prefer-json-parse-buffer': 'error',

				...strict
					? {}
					: {
							'unicorn/no-array-for-each': 'off',
							'unicorn/no-useless-undefined': 'off',
						},
			},
		},

		{
			name: 'fans/unicorn/vue',
			files: [GLOB_VUE],
			rules: {
				'unicorn/filename-case': ['error', {
					case: 'pascalCase',
				}],
			},
		},

		{
			name: 'fans/unicorn/astro',
			files: [GLOB_ASTRO],
			rules: {
				'unicorn/filename-case': ['error', {
					case: 'pascalCase',
				}],
			},
		},

		{
			name: 'fans/unicorn/storybook',
			files: [GLOB_STORYBOOK],
			rules: {
				'unicorn/filename-case': ['error', {
					case: 'pascalCase',
				}],
			},
		},

		{
			name: 'fans/unicorn/testing',
			files: GLOB_TESTS,
			rules: {
				'unicorn/filename-case': ['error', {
					case: 'pascalCase',
				}],
			},
		},
	])
}
