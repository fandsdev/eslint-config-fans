import pluginPrettier from 'eslint-plugin-prettier'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { defineConfig } from '../utils/index.js'

export function prettier() {
	return defineConfig([{
		name: 'fans/prettier',
		plugins: {
			prettier: pluginPrettier,
		},
		rules: {
			...pluginPrettierRecommended.rules,
			'prettier/prettier': 'warn',
		},
	}])
}
