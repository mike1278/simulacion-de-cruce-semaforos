module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
  purge: {
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './assets/**/*.scss',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
      'node_modules/vue-tailwind/dist/*.js',
    ],
  },
}
