/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'main-red': 'var(--main-red)',
				'main-white': 'var(--main-white)',
				'main-orange': 'var(--main-orange)',
				'main-black': 'var(--main-black)',
			},
		},
	},
	plugins: [],
};
