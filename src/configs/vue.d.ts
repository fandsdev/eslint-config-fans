import type { Linter } from 'eslint'

export interface VueOptions {
	typescript?: boolean
	prettier?: boolean
	stylistic?: boolean
	a11y?: boolean
}

export function vue(options?: VueOptions): Linter.Config[]
