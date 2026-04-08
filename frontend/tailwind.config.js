/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Blue & White Theme (BISMA)
                primary: {
                    DEFAULT: '#1A56DB',   // UPI Royal Blue
                    dark: '#1040B8',      // Darker blue for hover
                    light: '#3B82F6',     // Lighter blue accent
                },
                secondary: '#0EA5E9',     // Sky blue
                accent:    '#F59E0B',     // Amber for highlights
                background: '#F0F4FF',    // Very light blue-white bg
                surface:   '#FFFFFF',     // White surface
                muted:     '#64748B',     // Slate grey text
                'muted-light': '#94A3B8', // Light grey
                dark:      '#1E293B',     // Dark for text
                'dark-light': '#334155',
            },
            fontFamily: {
                sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
                display: ['Oswald', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            fontSize: {
                'display-lg': ['4.5rem', { lineHeight: '1', fontWeight: '700', letterSpacing: '-0.02em' }],
                'display': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
                'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
                'h2': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
                'body-lg': ['1.125rem', { lineHeight: '1.6' }],
                'body': ['1rem', { lineHeight: '1.6' }],
            },
            backgroundImage: {
                'dot-grid': "radial-gradient(circle, #1A56DB22 1px, transparent 1px)",
            },
            animation: {
                'fade-in': 'fadeIn 0.4s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
