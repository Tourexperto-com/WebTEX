export default {
    theme: {
        screens: {
            'sm': '480px',
            'md': '768px',
            'lg': '1080px',
            'xl': '1280px',
            'xxl': '1440px',
        },
        extend: {
            colors: {
                primary: "#D3245C",
                primaryButton: {
                    hover: "#DE3F72",
                    focus: "#C02053"
                },
                secondary: "#2E0049",
                violet: {
                    light: "#A46AFE",
                    mid: "#6C58FE",
                    dark: "#6E00AF"
                },
                dark: "#131313",
                light: "#FBF9F9",
                premier: "#E8B34C",
                whatsapp: "#36E85E",
                gray: {
                    extraLight: "#F9F9F9",
                    light: "#E9E9E9",
                    mid: "#D9D9D9",
                    dark: "#636363",
                    extraDark: "#2E2E2E"
                },
                tripadvisor: {
                    green: "#34E0A1",
                    black: "#000000"
                },
                error: "#F03A36",
            },
            fontFamily: {
                raleway: ['Raleway', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif']
            },
            // Chequear
            boxShadow: {
                '1': '0px 1px 4px 0px rgba(12, 12, 13, 0.15)',
            },
            backgroundImage: {
                'gradient-violet': 'linear-gradient(to bottom, #6C58FE, #2E0049)',
            }
        }
    }
}