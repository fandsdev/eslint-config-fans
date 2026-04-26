import parserTypescript from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'
import { GLOB_VUE } from '../globs.js'
import { defineConfig } from '../utils/index.js'

const DEFAULT_UNDEF_COMPONENTS = ['RouterView', 'RouterLink']

export function vue(options = {}) {
	const languageOptionsWithTS = {
		parser: parserVue,
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
			extraFileExtensions: ['.vue'],
			parser: parserTypescript,
			sourceType: 'module',
		},
	}

	const vueRecommendedRules = pluginVue.configs['flat/recommended'].reduce(
		(previous, current) => ({
			...previous,
			...current.rules,
		}),
		{},
	)

	return defineConfig([
		{
			name: 'fans/vue',
			files: [GLOB_VUE],
			plugins: {
				vue: pluginVue,
			},
			processor: pluginVue.processors.vue,
			languageOptions: options.typescript ? languageOptionsWithTS : null,
			rules: {
				...vueRecommendedRules,

				// Disabled TypeScript rules
				'@typescript-eslint/prefer-function-type': 'off',

				// Disabled
				'vue/max-attributes-per-line': 'off',
				'vue/no-v-html': 'off',
				'vue/one-component-per-file': 'off',
				'vue/singleline-html-element-content-newline': 'off',

				// Additional
				'vue/block-order': [
					'error',
					{ order: ['script', 'template', 'style'] },
				],
				'vue/define-macros-order': [
					'error',
					{
						order: [
							'defineOptions',
							'defineProps',
							'defineModel',
							'defineEmits',
							'defineSlots',
						],
						defineExposeLast: true,
					},
				],
				'vue/define-props-declaration': ['error', 'type-based'],
				'vue/no-import-compiler-macros': 'error',
				'vue/no-undef-components': [
					'error',
					{
						ignorePatterns: [
							...DEFAULT_UNDEF_COMPONENTS,
							...(options.extendUndefComponents || []),
						],
					},
				],
				'vue/no-unused-emit-declarations': 'error',
				'vue/no-unused-refs': 'error',
				'vue/no-useless-v-bind': 'error',
				'vue/no-use-v-else-with-v-for': 'error',
				'vue/padding-line-between-blocks': ['error', 'always'],
				'vue/prefer-define-options': 'error',
				'vue/prefer-use-template-ref': 'error',

				// Disabled for compatibility with external formatters (Prettier, oxfmt, etc.)
				...(options.useStylistic
					? {}
					: {
							'vue/html-indent': 'off',
							'vue/html-self-closing': 'off',
							'vue/html-closing-bracket-newline': 'off',
						}),
			},
		},
	])
}
