module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		jest: true,
	},
	extends: ['standard', 'eslint-config-prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'no-unused-vars': 'warn',
		'space-before-function-paren': 'off',
	},
};
