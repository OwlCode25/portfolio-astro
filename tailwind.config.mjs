/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'


export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {
			colors: {
				// OwlCode brand system — periwinkle-on-near-black, two colors only
				brand: {
					accent: '#7AA2F7', // Periwinkle — sole accent: borders, icons, CTAs, focus
				},
				blueprint: '#11121A', // Page background
				surface: '#171923',   // Card / panel surface
				ink: {
					DEFAULT: '#F2F4FC', // Primary text
					muted: '#98A2C7',   // Secondary/muted text, periwinkle-tinted (>=4.5:1 on background)
				},
			},
			fontFamily: {
				display: ['Roboto', 'sans-serif'], // Display headlines — pair with font-extralight
			},
		},
	},
	plugins: [
		require('flowbite/plugin'),
		animations
	],
}
