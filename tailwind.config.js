module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia'],
        mono: ['ui-monospace', 'SFMono-Regular'],
        display: ['Lato'],
        body: ['ui-sans-serif'],
      },
      fontSize: {
        xxs: '.5rem',
      },
      colors: {
        linkedin: '#0A66C2',
        swift: '#FF0524',
        flutter: '#4BD2FD',
        mongodb: '#11924F',
        mysql: '#017891',
        postgresql: '#2F6792',
        graphql: '#E632AD',
        elixir: '#644473',
        rust: '#000',
        kotlin: '#7F52FF',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        cmyk: {
          ...require('daisyui/src/colors/themes')['[data-theme=cmyk]'],
          primary: '#00ddff',
          secondary: '#fc0476',
        },
      },
    ],
    styled: true,
  },
}
