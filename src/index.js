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
	query,
	stylistic,
	test,
	typescript,
	unicorn,
	vue,
} from './configs/index.js'
import { resolveFormatter } from './utils/index.js'

export function defineConfig(options, ...userConfigs) {
	const {
		typescript: enableTypescript = false,
		vue: enableVue = false,
		astro: enableAstro = false,
		test: enableTest = false,
		unicorn: enableUnicorn = true,
		perfectionist: enablePerfectionist = false,
		oxlint: enableOxlint = false,
		query: enableQuery = false,
		strict = true,
	} = options

	const { useStylistic, usePrettier, stylisticOptions } = resolveFormatter(options)

	const configs = [
		ignores(options.ignores),
		javascript(),
		imports(),
		promise(),
		node(),
		deMorgan(),
	]

	const extraFileExtensions = []
	if (options.vue) {
		extraFileExtensions.push('.vue')
	}
	if (enableAstro) {
		extraFileExtensions.push('.astro')
	}

	if (enableUnicorn) {
		configs.push(unicorn({
			strict,
		}))
	}

	if (enableTypescript) {
		configs.push(
			typescript({
				extraFileExtensions,
				strict,
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
		configs.push(
			vue({
				typescript: options.typescript,
				usePrettier,
				useStylistic,
				...vueOptions,
			}),
		)
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
		const oxlintOptions = typeof options.oxlint === 'object' ? options.oxlint : {}
		configs.push(
			oxlint({
				...oxlintOptions,
				typescriptOptions: enableTypescript && oxlintOptions.dts
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
