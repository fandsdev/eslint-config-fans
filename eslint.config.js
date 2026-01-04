import { defineConfig } from './src/index.js'

/**
 * @type {import('./src/index.js').defineConfig}
 */
export const config = {
	typescript: true,
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
		dts: true,
	},
}

export default defineConfig(config)
