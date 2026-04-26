import pluginUnicorn from 'eslint-plugin-unicorn'
import { defineConfig } from '../utils/index.js'

const E18E_IGNORE_PATTERN = /e18e/i

export function unicorn() {
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
				'unicorn/filename-case': 'off',
				'unicorn/no-abusive-eslint-disable': 'off',
				'unicorn/no-array-callback-reference': 'off',
				'unicorn/no-array-for-each': 'off',
				'unicorn/no-array-reduce': 'off',
				'unicorn/no-null': 'off',
				'unicorn/no-object-as-default-parameter': 'off',
				'unicorn/no-useless-undefined': 'off',
				'unicorn/prefer-dom-node-dataset': 'off',
				'unicorn/prefer-global-this': 'off',

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

				// Additional
				'unicorn/better-regex': 'error',
				'unicorn/custom-error-definition': 'error',
				'unicorn/prefer-import-meta-properties': 'error',
				'unicorn/prefer-json-parse-buffer': 'error',
			},
		},
	])
}
