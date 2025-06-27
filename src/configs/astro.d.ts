import type { Linter } from 'eslint'

export interface AstroOptions {
	typescript?: boolean
	stylistic?: boolean
}

export function astro(options?: AstroOptions): Linter.Config[]
