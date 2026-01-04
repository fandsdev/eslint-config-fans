import pluginPerfectionist from 'eslint-plugin-perfectionist'
import { defineConfig } from '../utils/index.js'

export function perfectionist() {
	return defineConfig([
		{
			name: 'fans/perfectionist',
			plugins: {
				perfectionist: pluginPerfectionist,
			},
			rules: {
				'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
				'perfectionist/sort-imports': [
					'error',
					{
						groups: [
							'side-effect',
							'side-effect-style',
							'style',
							['type-builtin', 'type-external'],
							['type-internal', 'type-parent', 'type-sibling', 'type-index'],
							['builtin', 'external', 'unknown'],
							['internal', 'parent', 'sibling', 'index'],
						],
						newlinesBetween: 0,
						order: 'asc',
						type: 'alphabetical',
					},
				],
				'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
				'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
			},
		},
	])
}
