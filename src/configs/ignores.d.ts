import type { Linter } from 'eslint'

export function ignores(files?: string[]): Linter.Config[]
