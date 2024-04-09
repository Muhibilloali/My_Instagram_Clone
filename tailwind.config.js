/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
        colors: {
            gray: {
                border: '#dbdbdb',
                bg: '#fafafa',
                text: '#c7c7c7',
                dark: '#8e8e8e',
                base: '#616161',
                active: '#EFEFEF',
                hover: '#fafafa',
            },
            black: {
                pure: '#000000',
                icon: '#262626',
                faded: '#00000059',
                small: '#00000054',
            },
            blue: '#0095f6',
            orange: '#F9994A',
            red: {
                rose: '#ed4956',
                error: '#ed4956',
            },
            white: '#ffffff',
            pink: '#D44A9A',
            violate: '#6c5ce7',
        },
    },
    plugins: [],
};
