import pluginStylistic from '@stylistic/eslint-plugin'
import { defineConfig } from '../utils/index.js'

export function stylistic(options) {
	const { overrides, ...customizeOptions } = options
	const config = pluginStylistic.configs.customize({
		braceStyle: '1tbs',
		...customizeOptions,
	})

	return defineConfig([
		{
			name: 'fans/stylistic',
			plugins: {
				'@stylistic': pluginStylistic,
			},
			rules: {
				...config.rules,
				...overrides,
			},
		},
	])
}
