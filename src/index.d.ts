import type { Linter } from 'eslint'
import type { OxlintOptions, StylisticOptions, VueOptions } from './configs'
import type { Config } from './types'

interface DefineConfigOptions {
	ignores?: string[]

	/**
	 * @default true
	 *
	 * When disabled, the config will be less strict and opinionated.
	 */
	strict?: boolean

	/**
	 * @link https://typescript-eslint.io/
	 * @default false
	 */
	typescript?: boolean

	/**
	 * @link https://eslint.vuejs.org/
	 * @default false
	 */
	vue?: boolean | Omit<VueOptions, 'typescript'>

	/**
	 * @link https://ota-meshi.github.io/eslint-plugin-astro/
	 * @default false
	 */
	astro?: boolean

	/**
	 * @link https://github.com/vitest-dev/eslint-plugin-vitest
	 * @default false
	 */
	test?: boolean

	/**
	 * @link https://eslint.style
	 * @default false
	 *
	 * Note: This option is ignored when prettier is enabled.
	 */
	stylistic?: boolean | StylisticOptions

	/**
	 * @link https://github.com/prettier/eslint-plugin-prettier
	 * @default false
	 *
	 * When enabled, disables stylistic formatting rules to avoid conflicts.
	 */
	prettier?: boolean

	/**
	 * @link https://github.com/sindresorhus/eslint-plugin-unicorn
	 * @default true
	 */
	unicorn?: boolean

	/**
	 * @link https://perfectionist.dev
	 * @default false
	 */
	perfectionist?: boolean

	/**
	 * @link https://github.com/oxc-project/eslint-plugin-oxlint
	 * @default false
	 */
	oxlint?: boolean | Omit<OxlintOptions, 'typescriptOptions'> & {
		/**
		 * @default false
		 *
		 * When enabled, the typescript configs will be added after the oxlint configs to ensure the dts files are checked.
		 */
		dts?: boolean
	}
}

export function defineConfig(
	options: DefineConfigOptions,
	...configs: Config[] | Linter.Config[]
): Config[] | Linter.Config[]

export * from './globs'
