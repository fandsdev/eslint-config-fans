import {
	GLOB_ASTRO,
	GLOB_ASTRO_PAGES,
	GLOB_STORYBOOK,
	GLOB_TESTS,
	GLOB_TS,
	GLOB_VUE,
} from '../globs.js'
import { defineConfig } from '../utils/index.js'

export function opinionated(options = {}) {
	const {
		enableUnicorn = true,
		enableTypescript = false,
		extraFileExtensions = [],
	} = options

	const tsFiles = [GLOB_TS, ...extraFileExtensions.map(ext => `**/*${ext}`)]
	const out = []

	if (enableUnicorn) {
		out.push(
			{
				name: 'fans/opinionated/unicorn',
				rules: {
					'unicorn/no-useless-undefined': [
						'error',
						{
							checkArguments: false,
						},
					],
					'unicorn/no-array-for-each': 'error',
				},
			},
			{
				name: 'fans/opinionated/unicorn/vue',
				files: [GLOB_VUE],
				rules: {
					'unicorn/filename-case': [
						'error',
						{
							case: 'pascalCase',
						},
					],
				},
			},
			{
				name: 'fans/opinionated/unicorn/astro',
				files: [GLOB_ASTRO],
				rules: {
					'unicorn/filename-case': [
						'error',
						{
							case: 'pascalCase',
						},
					],
				},
			},
			{
				name: 'fans/opinionated/unicorn/astro/pages',
				files: [GLOB_ASTRO_PAGES],
				rules: {
					'unicorn/filename-case': [
						'error',
						{
							case: 'camelCase',
						},
					],
				},
			},
			{
				name: 'fans/opinionated/unicorn/storybook',
				files: [GLOB_STORYBOOK],
				rules: {
					'unicorn/filename-case': [
						'error',
						{
							case: 'pascalCase',
						},
					],
				},
			},
			{
				name: 'fans/opinionated/unicorn/testing',
				files: GLOB_TESTS,
				rules: {
					'unicorn/filename-case': 'off',
				},
			},
		)
	}

	if (enableTypescript) {
		out.push({
			name: 'fans/opinionated/typescript',
			files: tsFiles,
			rules: {
				'@typescript-eslint/consistent-type-definitions': 'off',
				'@typescript-eslint/array-type': [
					'error',
					{
						default: 'array-simple',
					},
				],
			},
		})
	}

	return defineConfig(out)
}
