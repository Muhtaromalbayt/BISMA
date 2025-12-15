/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // New "Obsidian & Electric" Theme
                obsidian: '#050505',       // Deepest Black/Grey
                'obsidian-light': '#121212', // Surface
                electric: '#CCFF00',       // High-Voltage Lime
                'electric-dim': '#A3CC00',
                neon: '#00F0FF',           // Cyber Cyan
                ash: '#888888',            // Muted Text
                'ash-light': '#E5E5E5',    // Primary Text
                
                // Keep semantic names mapped to new theme
                primary: '#CCFF00',        // Lime as primary action
                secondary: '#00F0FF',      // Cyan as secondary
                accent: '#FFFFFF',         // White as stark accent
                background: '#050505',
                surface: '#121212',
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
                'cyber-grid': "linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
                'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px #CCFF0020' },
                    '100%': { boxShadow: '0 0 20px #CCFF0060, 0 0 10px #CCFF00' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}
