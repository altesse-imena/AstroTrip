/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stripe-inspired color palette
        'primary': '#635bff',
        'primary-dark': '#4f46e5',
        'secondary': '#0a2540',
        'accent': '#00d4ff',
        'success': '#32d583',
        'warning': '#fbbf24',
        'error': '#f43f5e',
        'surface': '#f8fafc',
        'background': '#ffffff',
        'muted': '#f1f5f9',
        'subtle': '#e2e8f0',
        'dark': '#0a2540',
        'light': '#ffffff',
        'gradient-start': '#7a73ff',
        'gradient-end': '#32d583',
      },
      fontFamily: {
        'sans': ['Inter var', 'system-ui', 'sans-serif'],
        'display': ['Inter var', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'stripe': '0 50px 100px -20px rgba(50, 50, 93, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3)',
        'stripe-sm': '0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)',
        'stripe-md': '0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3)',
        'stripe-lg': '0 50px 100px -20px rgba(50, 50, 93, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        'stripe': '8px',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
