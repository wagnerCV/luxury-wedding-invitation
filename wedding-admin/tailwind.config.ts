import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        emerald: '#0F766E',
        burgundy: '#7C1D2F',
        sand: '#D6BFA8',
        offwhite: '#FAF7F5',
      },
    },
  },
  plugins: [],
}
export default config
