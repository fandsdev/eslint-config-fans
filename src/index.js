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
} from './configs/index.js'

export function defineConfig(options, ...userConfigs) {
	const {
		typescript: enableTypescript = false,
		vue: enableVue = false,
		astro: enableAstro = false,
		test: enableTest = false,
		stylistic: enableStylistic = false,
		prettier: enablePrettier = false,
		unicorn: enableUnicorn = true,
		perfectionist: enablePerfectionist = false,
		oxlint: enableOxlint = false,
		strict = true,
	} = options

	const configs = []

	configs.push(
		ignores(options.ignores),
		javascript(),
		imports(),
		promise(),
		node(),
		deMorgan(),
	)

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

	if (enablePrettier) {
		configs.push(prettier())
	}

	if (!enablePrettier) {
		let stylisticOptions = false
		if (enableStylistic !== false) {
			stylisticOptions = typeof options.stylistic === 'object' ? options.stylistic : {}
		}
		if (stylisticOptions !== false) {
			configs.push(stylistic(stylisticOptions))
		}
	}

	if (enablePerfectionist) {
		configs.push(perfectionist())
	}

	if (enableVue) {
		const vueOptions = typeof options.vue === 'object' ? options.vue : {}
		configs.push(
			vue({
				typescript: options.typescript,
				prettier: enablePrettier,
				...vueOptions,
			}),
		)
	}

	if (enableAstro) {
		configs.push(
			astro({
				typescript: enableTypescript,
				stylistic: enableStylistic !== false,
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
