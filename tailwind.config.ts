import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			screens: {
				xsmall: "350px",
				sm: defaultTheme.screens.sm,
				md: defaultTheme.screens.md,
				desktop: "600px",
				lg: defaultTheme.screens.lg,
				xl: "1236px",
				"2xl": "1400px",
			},
		},
	},
	plugins: [],
};
export default config;
