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
