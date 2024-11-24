/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: "./.eslintrc.js",
	rules: {
		'n8n-nodes-base/community-package-json-name-still-default': 'off',
		'n8n-nodes-base/community-package-json-author-email-still-default': 'off',
	},
};
