export const GLOB_SRC_EXT = '{js,ts}'

export const GLOB_TS = '**/*.ts'
export const GLOB_DTS = '**/*.d.ts'
export const GLOB_VUE = '**/*.vue'
export const GLOB_ASTRO = '**/*.astro'
export const GLOB_ASTRO_PAGES = '**/pages/**/*.astro'

export const GLOB_STORYBOOK = '**/*.stories.{js,ts}'

export const GLOB_TESTS = [
	`**/__tests__/**/*.${GLOB_SRC_EXT}`,
	`**/*.spec.${GLOB_SRC_EXT}`,
	`**/*.test.${GLOB_SRC_EXT}`,
]

export const GLOB_EXCLUDE = [
	// Defaults
	'**/node_modules',
	'**/dist',
	'**/LICENSE*',
	'**/CHANGELOG*.md',

	// IDE files
	'**/.vscode',
	'**/.idea',

	// Lock files
	'**/package-lock.json',
	'**/pnpm-lock.yaml',
	'**/yarn.lock',
	'**/bun.lockb',

	// Test files
	'**/temp',
	'**/coverage',
	'**/fixtures',
	'**/__snapshots__',

	// Vendor files
	'**/.vitepress/cache',
	'**/.nuxt',
	'**/.next',
	'**/.vercel',
	'**/.nitro',
]
