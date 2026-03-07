import type { Linter } from 'eslint'

export interface UnicornOptions {
	opinionated?: boolean
}

export function unicorn(options?: UnicornOptions): Linter.Config[]
