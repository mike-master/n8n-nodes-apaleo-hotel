/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	root: true,

	env: {
		browser: true,
		es6: true,
		node: true,
	},

	parser: '@typescript-eslint/parser',

	parserOptions: {
		project: ['./tsconfig.json'],
		sourceType: 'module',
		extraFileExtensions: ['.json'],
	},

	ignorePatterns: ['.eslintrc.js', '**/*.js', '**/node_modules/**', '**/dist/**'],

	overrides: [
		{
			files: ['package.json'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/community'],
			rules: {
				'n8n-nodes-base/community-package-json-name-still-default': 'off',
				// Ignoriere die E-Mail-Warnung in package.json
				'n8n-nodes-base/community-package-json-author-email-still-default': 'off',
			},
		},
		{
			files: ['./credentials/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/credentials'],
			rules: {
				'n8n-nodes-base/cred-class-field-documentation-url-missing': 'off',
				'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
				// Ignoriere fehlende Passwort-Optionen
				'n8n-nodes-base/cred-class-field-type-options-password-missing': 'off',
			},
		},
		{
			files: ['./nodes/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/nodes'],
			rules: {
				'n8n-nodes-base/node-execute-block-missing-continue-on-fail': 'off',
				'n8n-nodes-base/node-resource-description-filename-against-convention': 'off',
				'n8n-nodes-base/node-param-fixed-collection-type-unsorted-items': 'off',
				// Ignoriere alle alphabetischen Sortierungen
				'n8n-nodes-base/node-param-multi-options-type-unsorted-items': 'off',
				'n8n-nodes-base/node-param-options-type-unsorted-items': 'off',
				// Ignoriere Titel-Casing für Parameternamen
				'n8n-nodes-base/node-param-display-name-miscased': 'off',
				// Ignoriere unnötige Backticks in der Beschreibung
				'n8n-nodes-base/node-param-description-unneeded-backticks': 'off',
				// Ignoriere die Fehlermeldungen bezüglich des finalen Punkts
				'n8n-nodes-base/node-param-description-missing-final-period': 'off',
				'n8n-nodes-base/node-param-description-excess-final-period': 'off',
				// Ignoriere Fehler bezüglich der ID (ID vs. id)
				'n8n-nodes-base/node-param-display-name-miscased-id': 'off',
				// Ignoriere Regeln zum Standardwert von Parametern
				'n8n-nodes-base/node-param-default-wrong-for-options': 'off',
				// Ignoriere Regeln für die Beschreibung von Boolean-Parametern
				'n8n-nodes-base/node-param-description-boolean-without-whether': 'off',
			},
		},
	],
};
