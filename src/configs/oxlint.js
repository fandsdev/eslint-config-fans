import pluginOxlint from 'eslint-plugin-oxlint'
import { GLOB_DTS } from '../globs.js'
import { defineConfig } from '../utils/index.js'
import { typescript } from './typescript.js'

export function oxlint(options = {}) {
	const {
		oxlintConfigFile = './.oxlintrc.json',
		typescriptOptions,
	} = options

	const oxlintConfigs = pluginOxlint.buildFromOxlintConfigFile(oxlintConfigFile).map((config) => {
		return {
			...config,
			name: `fans/${config.name}`,
		}
	})

	const typescriptConfigs = (typescriptOptions ? typescript(typescriptOptions) : []).map((config) => {
		return {
			...config,
			files: [GLOB_DTS],
			name: 'fans/oxlint/dts',
		}
	})

	const configs = [...oxlintConfigs]

	if (typescriptConfigs.length > 0) {
		configs.push(...typescriptConfigs)
	}

	return defineConfig(configs)
}
