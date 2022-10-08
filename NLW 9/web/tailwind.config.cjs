/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.tsx', './index.html'],
	theme: {
		screens: {
			xxs: '450px',

			xs: '540px',

			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},
		ripple: (theme) => ({
			colors: theme('colors'),
			darken: 0.1,
		}),
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
		},
		extend: {
			backgroundImage: {
				galaxy: "url('/background-galaxy.png')",
				'nlw-gradient':
					'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)',
				'game-gradient':
					'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
					'100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
				},
			},
			animation: {
				'fade-in': 'fade-in 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-ripple')()],
};
