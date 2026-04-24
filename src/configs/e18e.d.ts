import type { Linter } from 'eslint'

export interface E18eOptions {
	/**
   * Enable modernization rules
   *
   * @see https://github.com/e18e/eslint-plugin#modernization
   * @default true
   */
	modernization?: boolean
	/**
   * Enable module replacements rules
   *
   * @see https://github.com/e18e/eslint-plugin#module-replacements
   * @default true
   */
	moduleReplacements?: boolean
	/**
   * Enable performance improvements rules
   *
   * @see https://github.com/e18e/eslint-plugin#performance-improvements
   * @default true
   */
	performanceImprovements?: boolean
}

export function e18e(options?: E18eOptions): Linter.Config[]
