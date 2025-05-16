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
				// Colores primarios
				blue: {
					royal: '#001c57',    // Azul real profundo
					navy: '#0a2472',     // Azul marino
					midnight: '#0b1b54', // Azul medianoche
					cobalt: '#1338be',   // Azul cobalto
					bright: '#2851e3',   // Azul brillante
				},
				// Tonos neutros
				neutral: {
					white: '#ffffff',      // Blanco
					light: '#e6e9f0',      // Gris azulado claro
					dark: '#2d3c5e',       // Gris azulado oscuro
				},
				// Colores de acento
				accent: {
					red: '#c22026',     // Rojo emblema
					gold: '#c9a227',    // Dorado
				}
			}
		},
	},
	plugins: [
		require('flowbite/plugin'),
		animations
	],
}
