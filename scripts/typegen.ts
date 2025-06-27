import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import fs from 'node:fs/promises'
import {
	astro,
	deMorgan,
	ignores,
	imports,
	javascript,
	node,
	oxlint,
	perfectionist,
	prettier,
	promise,
	stylistic,
	test,
	typescript,
	unicorn,
	vue,
} from '../src/configs'

const configs = [
	ignores(),
	javascript(),
	imports(),
	promise(),
	node(),
	deMorgan(),
	unicorn(),
	typescript(),
	vue({
		a11y: true,
	}),
	astro(),
	test(),
	prettier(),
	stylistic({}),
	perfectionist(),
	oxlint(),
].flat()

const configNames = configs.map(index => index.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
	includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(index => `'${index}'`).join(' | ')}
`

await fs.writeFile('src/typegen.d.ts', dts)
