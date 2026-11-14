/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // OUMM SUHAYL MEDICINE STORE Brand Palette
        pharmacy: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Fresh Medical Green
          600: '#059669', // Core Medical Green
          700: '#047857',
          800: '#065f46', // Deep Green
          900: '#064e3b', // Dark Medical Green Accent
          950: '#022c22', // Darkest Forest Medical
        },
        medblue: {
          50: '#f0f9ff',
          100: '#e0f2fe', // Soft Ice Blue
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8', // Clean Clinical Cyan/Light Blue
          500: '#0ea5e9',
          600: '#0284c7', // Professional Medical Blue
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        rx: {
          red: '#dc2626',
          rose: '#e11d48',
          bg: '#fef2f2',
          border: '#fecaca',
        }
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Inter'", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Inter'", "'Plus Jakarta Sans'", "sans-serif"],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 20px -2px rgba(5, 150, 105, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(5, 150, 105, 0.16), 0 4px 10px -2px rgba(2, 132, 199, 0.08)',
        'pill': '0 2px 8px rgba(5, 150, 105, 0.15)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.35)',
        'glow-blue': '0 0 20px rgba(14, 165, 233, 0.35)',
      },
      backgroundImage: {
        'pharmacy-gradient': 'linear-gradient(135deg, #059669 0%, #047857 50%, #064e3b 100%)',
        'pharmacy-light-gradient': 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #e0f2fe 100%)',
        'hero-gradient': 'linear-gradient(135deg, #064e3b 0%, #059669 60%, #0284c7 100%)',
        'blue-green': 'linear-gradient(135deg, #0284c7 0%, #059669 100%)',
      }
    },
  },
  plugins: [],
}
