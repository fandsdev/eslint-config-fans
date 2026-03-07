// @ts-check
import { defineConfig } from './src/index.js'

/**
 * @type {import('./src/index.js').DefineConfigOptions}
 */
export const config = {
	typescript: {
		typeAware: true,
	},
	vue: {
		a11y: true,
	},
	astro: true,
	test: true,
	formatter: {
		type: 'stylistic',
		options: {
			indent: 'tab',
		},
	},
	perfectionist: true,
	oxlint: {
		oxlintConfigFile: '.oxlintrc.json',
		dts: true,
	},
}

export default defineConfig(config)
