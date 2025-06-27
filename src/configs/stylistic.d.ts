import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'
import { Config } from 'src/types'

export type StylisticOptions = StylisticCustomizeOptions & {
	overrides?: Linter.Config['rules'] | Config['rules']
}

export function stylistic(options: StylisticOptions): Linter.Config[]
