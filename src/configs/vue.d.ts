import type { Linter } from 'eslint'

export interface VueOptions {
	typescript?: boolean
	prettier?: boolean
	a11y?: boolean
}

export function vue(options?: VueOptions): Linter.Config[]
