module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:solid/typescript',
		'plugin:import/recommended',
		'plugin:import/typescript'
	],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'project': 'tsconfig.json',
		'ecmaVersion': 'latest',
		'sourceType': 'module',
		'ecmaFeatures': {
			'jsx': true
		}
	},
	'plugins': [
		'@typescript-eslint',
		'import',
		'import-resolver',
		'solid'
	],
	'rules': {
		// Syntax
		'indent': ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],

		// SolidJS
		'solid/reactivity': 'warn',
		'solid/no-destructure': 'warn',
		'solid/jsx-no-undef': 'error',

		// Imports
		'import/resolver': ['error', {
			'node': {
				'extensions': ['.js', '.jsx', '.ts', '.tsx']
			}
		}],
		'import/order': ['error', {
			'groups': ['builtin', 'external', 'internal'],
			'pathGroups': [
				{
					'pattern': 'solid-bootstrap',
					'group': 'external',
					'position': 'after'
				},
				{
					'pattern': '@solid-primitives/**',
					'group': 'external',
					'position': 'after'
				},
			],
			'pathGroupsExcludedImportTypes': ['solid-js'],
			'newlines-between': 'always',
			'alphabetize': {
				'order': 'asc',
				'caseInsensitive': true
			}
		}],

		// Best Practices
	}
};
