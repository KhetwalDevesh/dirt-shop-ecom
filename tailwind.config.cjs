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
			"2xl": { max: "1500px" },
			// => @media (max-width: 1535px) { ... }

			xl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }

			lg: { max: "1079px" },
			// => @media (max-width: 1023px) { ... }

			mdlg: { max: "950px" },

			md: { max: "830px" },
			// => @media (max-width: 767px) { ... }

			sm: { max: "639px" },
			// => @media (max-width: 639px) { ... }
		},
	},
	plugins: [],
};
