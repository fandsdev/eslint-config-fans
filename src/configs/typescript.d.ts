import type { Linter } from 'eslint'

export interface TypescriptOptions {
	extraFileExtensions?: string[]
	strict?: boolean
}

export function typescript(options?: TypescriptOptions): Linter.Config[]
