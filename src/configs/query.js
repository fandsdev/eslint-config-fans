import pluginQuery from '@tanstack/eslint-plugin-query'
import { defineConfig } from '../utils/index.js'

export function query() {
	return defineConfig([{
		name: 'fans/query',
		plugins: {
			'@tanstack/query': pluginQuery,
		},
		rules: {
			...pluginQuery.configs.recommended.rules,
		},
	}])
}
