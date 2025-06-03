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
                lightViolet: "#6759F9",
                dark: "#131313",
                light: "#FBF9F9",
                premier: "#E7B44B",
                whatsapp: "#36E85E",
                gray: {
                    extraLight: "#F1F1F1",
                    light: "#E9E9E9",
                    mid: "#CCCCCC",
                    dark: "#969696",
                    extraDark: "#636363"
                }
            },
            fontFamily: {
                raleway: ['Raleway', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif']
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(102deg, #2E0049 1.06%, #6C58FE 100%)'
            }
        }
    }
}