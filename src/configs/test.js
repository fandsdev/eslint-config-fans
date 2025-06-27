import pluginVitest from '@vitest/eslint-plugin'
import { GLOB_TESTS } from '../globs.js'
import { defineConfig } from '../utils/index.js'

export function test() {
	return defineConfig([{
		files: GLOB_TESTS,
		plugins: {
			vitest: pluginVitest,
		},
	}])
}
