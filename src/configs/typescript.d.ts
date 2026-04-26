import type { Linter } from 'eslint'

export interface TypescriptOptions {
	extraFileExtensions?: string[]
	/**
	 * `true` — enables `stylistic-type-checked` and `recommended-type-checked`
	 * `'strict'` — experimental: also enables `strict-type-checked`
	 */
	typeAware?: boolean | 'strict'
}

export function typescript(options?: TypescriptOptions): Linter.Config[]
