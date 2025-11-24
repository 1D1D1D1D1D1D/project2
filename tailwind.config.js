module.exports = {
    content: [
        "./public/**/*.html", // Adjust paths to your HTML/TSX/JSX files
        "./src/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                main: "var(--main-color)",
                borderColorInput: "var(--ds-border-input)"
            }
        },
    },
    plugins: [],
}