import pluginE18e from '@e18e/eslint-plugin'
import { defineConfig } from '../utils/index.js'

export function e18e(options = {}) {
	const {
		modernization = true,
		moduleReplacements = true,
		performanceImprovements = true,
	} = options

	return defineConfig([{
		name: 'fans/e18e',
		plugins: {
			e18e: pluginE18e,
		},
		rules: {
			...(modernization ? pluginE18e.configs.modernization.rules : {}),
			...(moduleReplacements ? pluginE18e.configs.moduleReplacements.rules : {}),
			...(performanceImprovements ? pluginE18e.configs.performanceImprovements.rules : {}),
		},
	}])
}
