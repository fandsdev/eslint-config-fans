import pluginVueAccessibility from 'eslint-plugin-vuejs-accessibility'
import { GLOB_VUE } from '../globs.js'
import { defineConfig } from '../utils/index.js'

const vuejsAccessibilityRecommendedRules = pluginVueAccessibility.configs[
	'flat/recommended'
].reduce(
	(previous, current) => ({
		...previous,
		...current.rules,
	}),
	{},
)

export function vueA11y() {
	return defineConfig([
		{
			name: 'fans/vue-a11y',
			files: [GLOB_VUE],
			plugins: {
				'vuejs-accessibility': pluginVueAccessibility,
			},
			rules: {
				...vuejsAccessibilityRecommendedRules,
				'vuejs-accessibility/tabindex-no-positive': 'warn',
			},
		},
	])
}
