// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#111827',
          soft: '#1f2937',
        },
        primary: {
          DEFAULT: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        muted: '#6b7280',
        bg: {
          DEFAULT: '#0b0c10',
          soft: '#111316',
          card: '#101317',
        },
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,.25)',
      },
    },
  },
}
