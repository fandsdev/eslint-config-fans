import type { Linter } from 'eslint'

export interface UnicornOptions {
	strict?: boolean
}

export function unicorn(options: UnicornOptions): Linter.Config[]
