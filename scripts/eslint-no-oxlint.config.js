// @ts-check
import { config } from '../eslint.config.js'
import { defineConfig } from '../src/index.js'

export default defineConfig({
	...config,
	oxlint: false,
})
