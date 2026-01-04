import type { Linter } from 'eslint'

export interface VueOptions {
	typescript?: boolean
	usePrettier?: boolean

	/**
	 * Enable accessibility rules
	 *
	 * @link https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/
	 * @default false
	 */
	a11y?: boolean

	/**
	 * Extends the list of ignored components
	 * for the `vue/no-undef-components` rule
	 *
	 * @link https://eslint.vuejs.org/user-guide/#configuration
	 */
	extendUndefComponents?: string[]
}

export function vue(options?: VueOptions): Linter.Config[]
