export function defineConfig(config) {
	return config
}

/**
 * Normalizes formatter option from new and deprecated options
 * with warnings backwards compatibility and deprecation warnings.
 */
export function resolveFormatter(options) {
	const { formatter, prettier, stylistic } = options

	if (formatter !== undefined) {
		if (formatter === 'prettier') {
			return { usePrettier: true, useStylistic: false, stylisticOptions: null }
		}
		if (formatter === 'stylistic') {
			return { usePrettier: false, useStylistic: true, stylisticOptions: {} }
		}
		if (formatter === false) {
			return { usePrettier: false, useStylistic: false, stylisticOptions: null }
		}
		if (formatter.type === 'prettier') {
			return {
				usePrettier: true,
				useStylistic: false,
				stylisticOptions: null,
			}
		}
		if (formatter.type === 'stylistic') {
			return {
				usePrettier: false,
				useStylistic: true,
				stylisticOptions: formatter.options || {},
			}
		}
	}

	// Handle deprecated options with warnings
	if (prettier) {
		console.warn(
			'[eslint-config-fans] The "prettier" option is deprecated. Use "formatter: \'prettier\'" instead.',
		)
		return { usePrettier: true, useStylistic: false, stylisticOptions: null }
	}

	if (stylistic !== undefined && stylistic !== false) {
		console.warn(
			'[eslint-config-fans] The "stylistic" option is deprecated. Use "formatter: \'stylistic\'" or "formatter: { type: \'stylistic\', options }" instead.',
		)
		return {
			usePrettier: false,
			useStylistic: true,
			stylisticOptions: stylistic === true ? {} : stylistic,
		}
	}

	return { usePrettier: false, useStylistic: false, stylisticOptions: null }
}
