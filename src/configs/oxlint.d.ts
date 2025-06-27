import type { Linter } from 'eslint'
import type { TypescriptOptions } from './typescript.d.ts'

export interface OxlintOptions {
	oxlintConfigFile: string
	typescriptOptions?: TypescriptOptions
}

export function oxlint(options?: OxlintOptions): Linter.Config[]
