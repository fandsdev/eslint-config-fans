# ESLint Config Fans

<img align="right" width="100" height="87" title="ESLint Config Fans logo"
     src="https://github.com/fandsdev/eslint-config-fans/blob/546c9e682629694b9b068d2ef139246d325665ed/img/logo.svg">

Opinionated and flexible ESLint config with [TypeScript][typescript-eslint],
[Vue][vue], [Astro][astro] support and [oxlint][oxlint] integration.

- **Modern**: ESLint flat config with pregenerated TypeScript definitions
- **Strict**: Opinionated and rigorous linting rules for better code quality
- **Flexible**: Framework-agnostic with optional plugins
- **Zero-config**: Works out of the box, customize as needed
- **Fast**: Optional [oxlint][oxlint] integration (50-100x faster)
- **Actively maintained** and **production-tested** across diverse
  client projects at [FANS][fans] — both new and existing

**Default plugins:** [`@eslint/js`][eslint-js], [`import-x`][import-x],
[`promise`][promise], [`n`][node], [`de-morgan`][de-morgan],
[`unicorn`][unicorn]

**Optional plugins:** [`@typescript-eslint`][typescript-eslint], [`vue`][vue],
[`astro`][astro], [`vitest`][vitest], [`prettier`][prettier],
[`@stylistic`][stylistic], [`perfectionist`][perfectionist],
[`vuejs-accessibility`][vue-a11y], [`eslint-plugin-query`](eslint-plugin-query)

[**Inspect rules**][inspector] · [**View oxlint unsupported rules**][unsupported-rules]


## Table of Contents

- [Table of Contents](#table-of-contents)
- [Usage](#usage)
- [Customization](#customization)
	- [Available Options](#available-options)
	- [Ignores](#ignores)
	- [Strict Mode](#strict-mode)
	- [Formatting (Prettier and Stylistic)](#formatting)
	- [Custom Configurations and Overrides](#custom-configurations-and-overrides)
- [Framework Support](#framework-support)
	- [Vue](#vue)
	- [Nuxt](#nuxt)
	- [Astro](#astro)
- [Oxlint Support](#oxlint-support)
- [Inspect](#inspect)
- [Inspired By](#inspired-by)
- [Contributing](#contributing)


## Usage

Install the package:

```bash
pnpm add -D eslint-config-fans eslint
```

Create `eslint.config.js` in your project root:

```javascript
import { defineConfig } from 'eslint-config-fans'

export default defineConfig({
  // Enable features based on your project
  typescript: true,
  vue: true,
  prettier: true,
})
```


## Customization

### Available Options

```typescript
interface DefineConfigOptions {
  // Custom ignore patterns
  ignores?: string[]

  // Control strictness level
  strict?: boolean // default: true

  // Enable TypeScript support
  typescript?: boolean // default: false

  // Enable Vue.js support
  vue?: boolean | VueOptions // default: false

  // Enable Astro support
  astro?: boolean // default: false

  // Enable test files support (Vitest)
  test?: boolean // default: false

  // Enable stylistic formatting rules
  stylistic?: boolean | StylisticOptions // default: false

  // Enable Prettier integration
  prettier?: boolean // default: false

  // Enable unicorn rules (opinionated best practices)
  unicorn?: boolean | UnicornOptions // default: true

  // Enable import/export sorting
  perfectionist?: boolean // default: false

  // Enable oxlint support for better performance
  oxlint?: boolean | OxlintOptions // default: false

  // Enable TanStack Query support
  query?: boolean // default: false
}
```


### Ignores

By default, the config ignores common directories and files, and automatically
respects your `.gitignore` patterns. You can extend the ignore patterns:

```javascript
export default defineConfig({
  ignores: [
    'custom-dist/**',
    'legacy-code/**',
  ]
})
```


### Strict Mode

By default, the config operates in strict mode, which enables more opinionated
linting rules for better code quality. When disabled, the configuration becomes
less strict and more permissive:

```javascript
export default defineConfig({
  strict: false,
})
```

For new projects, we recommend keeping strict mode enabled.
For legacy codebases or gradual adoption, you may want
to start with `strict: false` and enable it later.


### Formatting

#### Prettier vs Stylistic

You can choose between Prettier and ESLint Stylistic for code formatting:

- **Prettier** (`prettier: true`): Uses Prettier for formatting,
  disables conflicting stylistic rules
- **Stylistic** (`stylistic: true`): Uses ESLint Stylistic rules for formatting
  (ignored when Prettier is enabled)


#### Stylistic Options

When using `stylistic: true`, you can customize formatting rules.
See [StylisticOptions][stylistic-options] for all available options:

```javascript
export default defineConfig({
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  }
})
```


#### Prettier Configuration

Prettier can be configured through standard `.prettierrc` files
or `prettier.config.js`. The ESLint config will automatically detect
and respect your Prettier settings.


### Custom Configurations and Overrides

You can extend the configuration with additional ESLint configs
and use exported globs for precise file targeting:

```javascript
import { defineConfig, GLOB_TS } from 'eslint-config-fans'

export default defineConfig(
  {
    typescript: true,
  },
  {
    files: [GLOB_TS],
    rules: {
      '@typescript-eslint/no-misused-promises': 'off',
    },
  }
)
```

[**Available globs**][globs]


## Framework Support

### Vue

Full support for [Vue][vue] projects with [vue-accessibility][vue-a11y]
and TypeScript integration:

```javascript
export default defineConfig({
  typescript: true,
  vue: {
    // Enable vue-a11y rules
    a11y: true,

    // Ignore undefined components for the `vue/no-undef-components` rule
    extendUndefComponents: ['CustomComponent'],
  }
})
```

This enables linting for `.vue` files with proper TypeScript support
and Vue-specific rules.


### Nuxt

Full compatibility with [Nuxt ESLint][nuxt-eslint]:

```javascript
import { defineConfig } from 'eslint-config-fans'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  defineConfig(
    {
      typescript: true,
      vue: {
        a11y: true,
      },
    },
  ),
)
```


### Astro

Full support for [Astro][astro-site] projects with TypeScript integration:

```javascript
export default defineConfig({
  typescript: true,
  astro: true,
})
```

This enables linting for `.astro` files with proper TypeScript support
and Astro-specific rules.


## Oxlint Support

This config includes built-in support for [oxlint][oxlint] — a blazing-fast
JavaScript linter written in Rust by [void(0)][voidzero].
Oxlint is **50-100 times faster** than ESLint and designed
for performance-critical workflows, making it perfect for large codebases
and CI environments.

> **Note:** Oxlint doesn’t support all ESLint rules yet.
> Check the [generated list of unsupported rules][unsupported-rules] to see
> which rules from this config are not available in oxlint.


### Enabling Oxlint

1. **Install oxlint:**
   ```bash
   pnpm add -D oxlint
   ```

2. **Create your ESLint config** as described above

3. **Generate oxlint configuration** from your ESLint config:
   ```bash
   pnpx @oxlint/migrate ./eslint.config.js
   ```

4. **Enable oxlint** in your configuration:
   ```javascript
   export default defineConfig({
     typescript: true,
     vue: true,
     oxlint: true, // Enable oxlint support
   })
   ```

   For TypeScript projects, you might want to enable DTS checking:
   ```javascript
   export default defineConfig({
     typescript: true,
     oxlint: {
       dts: true, // Check .d.ts files with TypeScript rules
     },
   })
   ```


## Inspect

You can inspect your ESLint configuration using the interactive configuration inspector:

```bash
pnpx @eslint/config-inspector --config eslint.config.js
```

Or add it as a script to your `package.json`:

```json
{
  "scripts": {
    "lint:inspect": "pnpx @eslint/config-inspector --config eslint.config.js"
  }
}
```


## Inspired By

This configuration is inspired by and builds upon the excellent work of:

- [@logux/eslint-config][logux-config]
- [@sxzz/eslint-config][sxzz-config]
- [@antfu/eslint-config][antfu-config]


## Contributing

This package can be installed directly from the repository, thanks to our
pure JavaScript implementation with TypeScript definitions provided
via `.d.ts` files — no compilation step required.

```bash
pnpm add -D github:fandsdev/eslint-config-fans
```

All versions follow [Semantic Versioning][semver].


[fans]: https://fans.dev/
[globs]: https://github.com/fandsdev/eslint-config-fans/blob/main/src/globs.js
[eslint-js]: https://eslint.org/docs/latest/rules/
[typescript-eslint]: https://typescript-eslint.io/
[import-x]: https://github.com/un-es/eslint-plugin-import-x
[promise]: https://github.com/eslint-community/eslint-plugin-promise
[node]: https://github.com/eslint-community/eslint-plugin-n
[de-morgan]: https://github.com/jonathanharrell/eslint-plugin-de-morgan
[unicorn]: https://github.com/sindresorhus/eslint-plugin-unicorn
[vue]: https://eslint.vuejs.org/
[nuxt-eslint]: https://eslint.nuxt.com/
[astro]: https://ota-meshi.github.io/eslint-plugin-astro/
[vitest]: https://github.com/vitest-dev/eslint-plugin-vitest
[prettier]: https://github.com/prettier/eslint-plugin-prettier
[stylistic]: https://eslint.style/
[perfectionist]: https://perfectionist.dev/
[vue-a11y]: https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/
[flat-config]: https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file
[eslint-typegen]: https://github.com/antfu/eslint-typegen
[inspector]: https://eslint-config.fans.dev/
[stylistic-options]: https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/dts/options.d.ts
[astro-site]: https://astro.build/
[oxlint]: https://oxc.rs/docs/guide/usage/linter.html
[voidzero]: https://voidzero.dev/
[unsupported-rules]: ./docs/oxlint/UNSUPPORTED-RULES.md
[antfu-config]: https://github.com/antfu/eslint-config
[sxzz-config]: https://github.com/sxzz/eslint-config
[logux-config]: https://github.com/logux/eslint-config
[semver]: https://semver.org/
[eslint-plugin-query]: https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query
