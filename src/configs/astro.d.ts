import type { Linter } from 'eslint'

export interface AstroOptions {
	typescript?: boolean
	useStylistic?: boolean
}

export function astro(options?: AstroOptions): Linter.Config[]
