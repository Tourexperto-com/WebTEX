export default {
    theme: {
        screens: {
            'sm': '480px',
            'md': '768px',
            'lg': '1080px',
            'xl': '1280px',
            '2xl': '1375px',
        },
        extend: {
            colors: {
                primary: "#D3245C",
                secondary: "#2E0049",
                violet: {
                    light: "#A46AFE",
                    mid: "#6C58FE"
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
                }
            },
            fontFamily: {
                raleway: ['Raleway', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif']
            },
            // Chequear
            boxShadow: {
                '40': '0px 0px 11px 0px rgba(0, 0, 0, .4);'
            }
        }
    }
}