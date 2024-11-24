/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	root: true,

	env: {
		node: true,
	},

	parser: '@typescript-eslint/parser',

	parserOptions: {
		project: ['./tsconfig.json'],
		sourceType: 'module',
		extraFileExtensions: ['.json'],
	},

	ignorePatterns: ['.eslintrc.js', '**/*.js', '**/node_modules/**', '**/dist/**'],

	rules: {
		'n8n-nodes-base/node-filename-against-convention': 'off',
		'n8n-nodes-base/node-param-resource-with-plural-option': 'off',
		'n8n-nodes-base/node-param-description-miscased-id': 'off',
		'n8n-nodes-base/node-param-operation-option-action-miscased': 'off',
		'n8n-nodes-base/node-param-collection-type-unsorted-items': 'off',
		'n8n-nodes-base/node-param-description-lowercase-first-char': 'off',
		'n8n-nodes-base/node-param-description-identical-to-display-name': 'off',
		'n8n-nodes-base/node-param-required-false': 'off',
		'n8n-nodes-base/community-package-json-name-still-default': 'off',
		'n8n-nodes-base/community-package-json-author-email-still-default': 'off',
		'n8n-nodes-base/cred-class-field-documentation-url-missing': 'off',
		'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
		'n8n-nodes-base/cred-class-field-type-options-password-missing': 'off',
		'n8n-nodes-base/node-execute-block-missing-continue-on-fail': 'off',
		'n8n-nodes-base/node-resource-description-filename-against-convention': 'off',
		'n8n-nodes-base/node-param-fixed-collection-type-unsorted-items': 'off',
		'n8n-nodes-base/node-param-multi-options-type-unsorted-items': 'off',
		'n8n-nodes-base/node-param-options-type-unsorted-items': 'off',
		'n8n-nodes-base/node-param-display-name-miscased': 'off',
		'n8n-nodes-base/node-param-description-unneeded-backticks': 'off',
		'n8n-nodes-base/node-param-description-missing-final-period': 'off',
		'n8n-nodes-base/node-param-description-excess-final-period': 'off',
		'n8n-nodes-base/node-param-display-name-miscased-id': 'off',
		'n8n-nodes-base/node-param-default-wrong-for-options': 'off',
		'n8n-nodes-base/node-param-description-boolean-without-whether': 'off',
	},
};
