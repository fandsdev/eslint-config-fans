import type { Linter } from 'eslint'

export interface OpinionatedOptions {
	/** @default true */
	enableUnicorn?: boolean
	/** @default false */
	enableTypescript?: boolean
	extraFileExtensions?: string[]
}

export function opinionated(options?: OpinionatedOptions): Linter.Config[]
