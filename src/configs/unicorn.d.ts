import type { Linter } from 'eslint'

export interface UnicornOptions {
	strict?: boolean

	/**
	 * Extends the list of replacements
	 * for the `unicorn/prevent-abbreviations` rule
	 */
	extendAbbreviationsReplacements?: string[]
}

export function unicorn(options?: UnicornOptions): Linter.Config[]
