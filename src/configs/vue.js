import parserTypescript from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
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

	const vueRecommendedRules = pluginVue.configs['flat/recommended']
		.reduce((previous, current) => ({
			...previous,
			...current.rules,
		}), {})

	return defineConfig([
		{
			name: 'fans/vue',
			files: [GLOB_VUE],
			plugins: {
				vue: pluginVue,
				...options.a11y ? { 'vue-a11y': pluginVueA11y } : {},
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
				'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
				'vue/define-macros-order': ['error', {
					order: [
						'defineOptions',
						'defineProps',
						'defineModel',
						'defineEmits',
						'defineSlots',
					],
					defineExposeLast: true,
				}],
				'vue/define-props-declaration': ['error', 'type-based'],
				'vue/no-import-compiler-macros': 'error',
				'vue/no-undef-components': ['error', {
					ignorePatterns: [
						...DEFAULT_UNDEF_COMPONENTS,
						...(options.extendUndefComponents || []),
					],
				}],
				'vue/no-unused-emit-declarations': 'error',
				'vue/no-unused-refs': 'error',
				'vue/no-useless-v-bind': 'error',
				'vue/no-use-v-else-with-v-for': 'error',
				'vue/padding-line-between-blocks': ['error', 'always'],
				'vue/prefer-define-options': 'error',
				'vue/prefer-use-template-ref': 'error',

				...options.a11y
					? {
							'vue-a11y/alt-text': 'error',
							'vue-a11y/anchor-has-content': 'error',
							'vue-a11y/aria-props': 'error',
							'vue-a11y/aria-role': 'error',
							'vue-a11y/aria-unsupported-elements': 'error',
							'vue-a11y/click-events-have-key-events': 'error',
							'vue-a11y/form-control-has-label': 'error',
							'vue-a11y/heading-has-content': 'error',
							'vue-a11y/iframe-has-title': 'error',
							'vue-a11y/interactive-supports-focus': 'error',
							'vue-a11y/label-has-for': 'error',
							'vue-a11y/media-has-caption': 'warn',
							'vue-a11y/mouse-events-have-key-events': 'error',
							'vue-a11y/no-access-key': 'error',
							'vue-a11y/no-aria-hidden-on-focusable': 'error',
							'vue-a11y/no-autofocus': 'warn',
							'vue-a11y/no-distracting-elements': 'error',
							'vue-a11y/no-redundant-roles': 'error',
							'vue-a11y/no-role-presentation-on-focusable': 'error',
							'vue-a11y/no-static-element-interactions': 'error',
							'vue-a11y/role-has-required-aria-props': 'error',
							'vue-a11y/tabindex-no-positive': 'warn',
						}
					: {},

				// Disabled for compatibility with external formatters (Prettier, oxfmt, etc.)
				...options.useStylistic
					? {}
					: {
							'vue/html-indent': 'off',
							'vue/html-self-closing': 'off',
							'vue/html-closing-bracket-newline': 'off',
						},
			},
		},
	])
}
