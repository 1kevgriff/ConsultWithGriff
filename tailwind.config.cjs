/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary': '#6C7A89', // Slate Gray
				'secondary': '#34495E', // Navy Blue
				'accent-1': '#FDFEFE', // Soft White
				'accent-2': '#B4D8E7', // Light Blue
				'highlight': '#1A535C', // Deep Teal
			}
		},
	},
	plugins: [],
}
