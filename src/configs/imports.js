import pluginImportX from 'eslint-plugin-import-x'
import { defineConfig } from '../utils/index.js'

export function imports() {
	return defineConfig([{
		name: 'fans/imports',
		plugins: {
			'import-x': pluginImportX,
		},
		rules: {
			'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			'import-x/export': 'error',
			'import-x/first': 'error',
			'import-x/no-duplicates': 'error',
			'import-x/no-mutable-exports': 'error',
			'import-x/no-named-default': 'error',
			'import-x/no-self-import': 'error',
			'import-x/no-webpack-loader-syntax': 'error',
		},
	}])
}
