# Oxlint Unsupported Rules

This document lists ESLint rules that are currently skipped by oxlint migration.

## Summary

- **Total skipped:** 129 rules
- **Nursery:** 50 rules
- **Unsupported:** 79 rules

## Nursery Rules (In Development)

These rules are currently being developed and will be available in future versions:

- `no-restricted-exports`
- `no-undef`
- `import-x/export`
- `promise/no-return-in-finally`
- `unicorn/no-useless-iterator-to-array`
- `@typescript-eslint/prefer-optional-chain`
- `consistent-this`
- `id-denylist`
- `no-restricted-syntax`
- `no-unreachable-loop`
- `strict`
- `n/no-deprecated-api`
- `n/no-extraneous-require`
- `n/no-missing-require`
- `n/no-unpublished-require`
- `n/no-unsupported-features/es-builtins`
- `n/no-unsupported-features/es-syntax`
- `n/prefer-global/buffer`
- `n/prefer-node-protocol`
- `n/process-exit-as-throw`
- `unicorn/better-regex`
- `unicorn/expiring-todo-comments`
- `unicorn/isolated-functions`
- `unicorn/no-unnecessary-polyfills`
- `unicorn/prefer-export-from`
- `unicorn/prefer-json-parse-buffer`
- `unicorn/prefer-simple-condition-first`
- `unicorn/prefer-single-call`
- `unicorn/prefer-switch`
- `unicorn/prevent-abbreviations`
- `vue/jsx-uses-vars`
- `vue/multi-word-component-names`
- `vue/no-async-in-computed-properties`
- `vue/no-deprecated-dollar-listeners-api`
- `vue/no-deprecated-dollar-scopedslots-api`
- `vue/no-dupe-keys`
- `vue/no-mutating-props`
- `vue/no-ref-as-operand`
- `vue/no-reserved-keys`
- `vue/no-reserved-props`
- `vue/no-side-effects-in-computed-properties`
- `vue/no-use-computed-property-like-method`
- `vue/require-valid-default-prop`
- `vue/prop-name-casing`
- `vue/require-default-prop`
- `vue/require-prop-types`
- `vue/order-in-components`
- `vue/no-unused-emit-declarations`
- `vue/prefer-define-options`
- `vue/prefer-use-template-ref`

## Unsupported Rules

These rules are not yet supported by oxlint:

- `no-dupe-args: Superseded by strict mode.`
- `no-invalid-this: Superseded by TypeScript's [`noImplicitThis`](https://www.typescriptlang.org/tsconfig/#noImplicitThis) compiler option (enabled by `strict` mode).`
- `no-octal: Superseded by strict mode.`
- `no-octal-escape: Superseded by strict mode.`
- `unicorn/no-for-loop: This rule suggests using `Array.prototype.entries`which is slow https://github.com/oxc-project/oxc/issues/11311, furthermore,`typescript/prefer-for-of` covers most cases.`
- `unicorn/no-named-default: Implemented via `import/no-named-default`.`
- `unicorn/template-indent: Stylistic rule.`
- `vue/comment-directive: Not currently possible, as it requires Vue template parsing. Also possibly unnecessary as its own rule, as oxlint directives should be implemented at the same time as Vue template parsing.`
- `vue/no-child-content: Not currently possible, as it requires Vue template parsing.`
- `vue/no-deprecated-filter: Not currently possible, as it requires Vue template parsing.`
- `vue/no-deprecated-functional-template: Not currently possible, as it requires Vue template parsing.`
- `vue/no-deprecated-html-element-is: Not currently possible, as it requires Vue template parsing.`
- `vue/no-deprecated-inline-template: Not currently possible, as it requires Vue template parsing.`
- `vue/no-deprecated-router-link-tag-prop: Not currently possible, as it requires Vue template parsing.`
- `vue/no-deprecated-scope-attribute: Not currently possible, as it requires Vue template parsing.`
- `vue/no-deprecated-slot-attribute: Not currently possible, as it requires Vue template parsing.`
- `vue/no-deprecated-slot-scope-attribute: Not currently possible, as it requires Vue template parsing.`
- `vue/no-deprecated-v-bind-sync: Not currently possible, as it requires Vue template parsing.`
- `vue/no-deprecated-v-is: Not currently possible, as it requires Vue template parsing.`
- `vue/no-deprecated-v-on-native-modifier: Not currently possible, as it requires Vue template parsing.`
- `vue/no-deprecated-v-on-number-modifiers: Not currently possible, as it requires Vue template parsing.`
- `vue/no-dupe-v-else-if: Not currently possible, as it requires Vue template parsing.`
- `vue/no-duplicate-attributes: Not currently possible, as it requires Vue template parsing.`
- `vue/no-parsing-error: Not currently possible, as it requires Vue template parsing.`
- `vue/no-template-key: Not currently possible, as it requires Vue template parsing.`
- `vue/no-textarea-mustache: Not currently possible, as it requires Vue template parsing.`
- `vue/no-unused-components: Not currently possible, as it requires Vue template parsing.`
- `vue/no-unused-vars: Not currently possible, as it requires Vue template parsing. May also prefer to cover this via the core no-unused-vars rule.`
- `vue/no-use-v-if-with-v-for: Not currently possible, as it requires Vue template parsing.`
- `vue/no-useless-template-attributes: Not currently possible, as it requires Vue template parsing.`
- `vue/no-v-for-template-key-on-child: Deprecated.`
- `vue/no-v-text-v-html-on-component: Not currently possible, as it requires Vue template parsing.`
- `vue/require-component-is: Not currently possible, as it requires Vue template parsing.`
- `vue/require-toggle-inside-transition: Not currently possible, as it requires Vue template parsing.`
- `vue/require-v-for-key: Not currently possible, as it requires Vue template parsing.`
- `vue/use-v-on-exact: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-attribute-name: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-template-root: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-bind: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-cloak: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-else-if: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-else: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-for: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-html: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-if: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-is: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-memo: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-model: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-on: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-once: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-pre: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-show: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-slot: Not currently possible, as it requires Vue template parsing.`
- `vue/valid-v-text: Not currently possible, as it requires Vue template parsing.`
- `vue/attribute-hyphenation: Not currently possible, as it requires Vue template parsing.`
- `vue/first-attribute-linebreak: Stylistic rule.`
- `vue/html-closing-bracket-spacing: Stylistic rule.`
- `vue/html-end-tags: Not currently possible, as it requires Vue template parsing.`
- `vue/html-quotes: Stylistic rule.`
- `vue/multiline-html-element-content-newline: Not currently possible, as it requires Vue template parsing.`
- `vue/mustache-interpolation-spacing: Stylistic rule.`
- `vue/no-multi-spaces: Stylistic rule.`
- `vue/no-spaces-around-equal-signs-in-attribute: Stylistic rule.`
- `vue/no-template-shadow: Not currently possible, as it requires Vue template parsing.`
- `vue/require-explicit-emits: Not currently possible, as it requires Vue template parsing.`
- `vue/v-bind-style: Not currently possible, as it requires Vue template parsing.`
- `vue/v-on-event-hyphenation: Not currently possible, as it requires Vue template parsing.`
- `vue/v-on-style: Not currently possible, as it requires Vue template parsing.`
- `vue/v-slot-style: Not currently possible, as it requires Vue template parsing.`
- `vue/attributes-order: Not currently possible, as it requires Vue template parsing.`
- `vue/block-order: Not currently possible, as it requires Vue template parsing.`
- `vue/no-lone-template: Not currently possible, as it requires Vue template parsing.`
- `vue/this-in-template: Not currently possible, as it requires Vue template parsing.`
- `vue/define-macros-order: Stylistic rule.`
- `vue/no-undef-components: Not currently possible, as it requires Vue template parsing.`
- `vue/no-unused-refs: Not currently possible, as it requires Vue template parsing.`
- `vue/no-useless-v-bind: Not currently possible, as it requires Vue template parsing.`
- `vue/no-use-v-else-with-v-for: Not currently possible, as it requires Vue template parsing.`
- `vue/padding-line-between-blocks: Stylistic rule.`
