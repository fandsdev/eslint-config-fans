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
	perfectionist: true,
}

export default defineConfig(config)
