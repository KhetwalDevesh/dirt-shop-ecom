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
	},
	plugins: [],
};
