/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#E0E0D7",
				secondary: "#2E3830",
				lemon: "#D6E089",
				"lemon-light": "#E0E0D6",
			},
			fontFamily: {
				outfit: ["Outfit", "sans-serif"],
			},
		},
		screens: {
			"2xl": { max: "1535px" },
			// => @media (max-width: 1535px) { ... }

			xl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }

			lg: { max: "1023px" },
			// => @media (max-width: 1023px) { ... }

			mdlg: { max: "950px" },

			md: { max: "767px" },
			// => @media (max-width: 767px) { ... }

			sm: { max: "639px" },
			// => @media (max-width: 639px) { ... }

			sm2: { max: "550px" },
			sm3: { max: "400px" },
			sm4: { max: "350px" },
		},
	},
	plugins: [],
};
