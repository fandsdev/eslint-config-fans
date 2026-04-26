import {
	astro,
	deMorgan,
	e18e,
	ignores,
	imports,
	javascript,
	node,
	opinionated as opinionatedConfig,
	oxlint,
	perfectionist,
	prettier,
	promise,
	query,
	stylistic,
	test,
	typescript,
	unicorn,
	vue,
	vueA11y,
} from './configs/index.js'
import { resolveFormatter } from './utils/index.js'

export function defineConfig(options, ...userConfigs) {
	const {
		typescript: typescriptOption = false,
		vue: enableVue = false,
		astro: enableAstro = false,
		test: enableTest = false,
		unicorn: enableUnicorn = true,
		perfectionist: enablePerfectionist = false,
		oxlint: enableOxlint = false,
		query: enableQuery = false,
		e18e: e18eOption = true,
		strict,
		opinionated = true,
	} = options

	const enableTypescript = Boolean(typescriptOption)
	const typescriptUserOptions =
		typeof typescriptOption === 'object' ? typescriptOption : {}
	const typeAware = typescriptUserOptions.typeAware ?? true

	if (strict !== undefined) {
		console.warn(
			'[eslint-config-fans] The `strict` option is deprecated. Use `typescript: { typeAware }` and `opinionated` instead.',
		)
	}

	if (typeAware === 'strict') {
		console.warn(
			'[eslint-config-fans] `typeAware: "strict"` is experimental and may change in future releases.',
		)
	}

	const resolvedTypeAware = strict === undefined ? typeAware : strict
	const resolvedOpinionated = strict === undefined ? opinionated : strict

	const { useStylistic, usePrettier, stylisticOptions } =
		resolveFormatter(options)

	const enableE18e = Boolean(e18eOption)
	const e18eUserOptions = typeof e18eOption === 'object' ? e18eOption : {}

	const configs = [
		ignores(options.ignores),
		javascript(),
		imports(),
		promise(),
		node(),
		deMorgan(),
	]

	if (enableE18e) {
		configs.push(e18e(e18eUserOptions))
	}

	const extraFileExtensions = []
	if (options.vue) {
		extraFileExtensions.push('.vue')
	}
	if (enableAstro) {
		extraFileExtensions.push('.astro')
	}

	if (enableUnicorn) {
		configs.push(unicorn())
	}

	if (enableTypescript) {
		configs.push(
			typescript({
				extraFileExtensions,
				typeAware: resolvedTypeAware,
			}),
		)
	}

	if (resolvedOpinionated) {
		configs.push(
			opinionatedConfig({
				enableUnicorn,
				enableTypescript,
				extraFileExtensions,
			}),
		)
	}

	if (usePrettier) {
		configs.push(prettier())
	}

	if (useStylistic) {
		configs.push(stylistic(stylisticOptions))
	}

	if (enablePerfectionist) {
		configs.push(perfectionist())
	}

	if (enableQuery) {
		configs.push(query())
	}

	if (enableVue) {
		const vueOptions = typeof options.vue === 'object' ? options.vue : {}
		const { a11y, ...restVue } = vueOptions
		configs.push(
			vue({
				typescript: typescriptOption,
				usePrettier,
				useStylistic,
				...restVue,
			}),
		)
		if (a11y) {
			configs.push(vueA11y())
		}
	}

	if (enableAstro) {
		configs.push(
			astro({
				typescript: enableTypescript,
				useStylistic,
			}),
		)
	}

	if (enableTest) {
		configs.push(test())
	}

	configs.push(...userConfigs)

	if (enableOxlint) {
		const oxlintOptions =
			typeof options.oxlint === 'object' ? options.oxlint : {}
		configs.push(
			oxlint({
				...oxlintOptions,
				typescriptOptions:
					enableTypescript && oxlintOptions.dts
						? {
								extraFileExtensions,
							}
						: undefined,
			}),
		)
	}

	return configs.flat()
}

export * from './globs.js'
