import gitignore from 'eslint-config-flat-gitignore'
import { GLOB_EXCLUDE } from '../globs.js'
import { defineConfig } from '../utils/index.js'

export function ignores(files = []) {
	return defineConfig([
		{
			name: 'fans/ignores',
			ignores: [
				...GLOB_EXCLUDE,
				...files,
			],
		},
		{
			...gitignore({
				name: 'fans/ignores/git',
				strict: false,
			}),
		},
	])
}
