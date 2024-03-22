/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["dark", "light", "cupcake", "cyberpunk"],
	},
};
