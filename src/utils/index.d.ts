import type { Linter } from 'eslint'
import type { Config } from '../types'

export function defineConfig(config: Config[] | Linter.Config[]): Config[] | Linter.Config[]
