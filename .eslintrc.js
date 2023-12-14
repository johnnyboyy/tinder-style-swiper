module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		// npm i -D eslint-config-airbnb-base
		"airbnb-base",
		// npm i -D eslint-config-airbnb-typescript
		"airbnb-typescript",
		// nextjs requires npm i -D eslint-config-next
		"next",
		"next/core-web-vitals",
		// requires npm i -D eslint-plugin-prettier eslint-config-prettier
		"prettier",
		// requires npm i -D eslint-plugin-tailwindcss
		"plugin:tailwindcss/recommended",
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
		project: "./tsconfig.json",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	plugins: [
		// requires npm i -D eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
		"@typescript-eslint",
		// requires npm i -D eslint-plugin-tailwindcss
		"tailwindcss",
		// requires npm i -D eslint-plugin-use-encapsulation
		"use-encapsulation",
		// npm i -D eslint-plugin-validate-jsx-nesting
		"validate-jsx-nesting",
	],
	rules: {
		"react/prop-types": "off",
		"react/jsx-curly-brace-presence": "error",
		"react/react-in-jsx-scope": "off",
		"react/self-closing-comp": [
			"error",
			{
				component: true,
				html: true,
			},
		],
		"react/jsx-boolean-value": "error",
		"prefer-template": "error",
		"jsx-quotes": ["error", "prefer-double"],
		"@typescript-eslint/quotes": ["error", "double"],
		"@typescript-eslint/indent": "off",
		"react/jsx-tag-spacing": "error",
		curly: ["error", "all"],
		// "max-len": ["error", { code: 120, ignoreUrls: true }],
		"arrow-body-style": ["error", "always"],
		"no-else-return": "off",
		"no-console": ["error", { allow: ["warn", "error"] }],
		// https://kyleshevlin.com/use-encapsulation
		// https://github.com/kyleshevlin/eslint-plugin-use-encapsulation
		"use-encapsulation/prefer-custom-hooks": ["error", { allow: ["useMemo"] }],
		// https://github.com/MananTank/eslint-plugin-validate-jsx-nesting
		"validate-jsx-nesting/no-invalid-jsx-nesting": "error",
		"@next/next/no-img-element": "off",
		"import/prefer-default-export": "off",
	},
};
