import pluginDeMorgan from 'eslint-plugin-de-morgan'
import { defineConfig } from '../utils/index.js'

export function deMorgan() {
	return defineConfig([
		{
			...pluginDeMorgan.configs.recommended,
			name: 'fans/de-morgan',
		},
	])
}
