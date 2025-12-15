export default function BismaLogo({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 400 80"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Background accent */}
            <defs>
                <linearGradient id="electricGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#CCFF00" />
                    <stop offset="100%" stopColor="#00F0FF" />
                </linearGradient>
            </defs>

            {/* B */}
            <text
                x="0"
                y="55"
                fontSize="64"
                fontWeight="900"
                fontFamily="Oswald, system-ui, sans-serif"
                fill="#FFFFFF"
            >
                B
            </text>

            {/* I with sound wave accent */}
            <text
                x="50"
                y="55"
                fontSize="64"
                fontWeight="900"
                fontFamily="Oswald, system-ui, sans-serif"
                fill="#FFFFFF"
            >
                I
            </text>
            {/* Sound wave dots above I */}
            <circle cx="60" cy="8" r="4" fill="url(#electricGradient)" />
            <circle cx="60" cy="18" r="6" fill="url(#electricGradient)" opacity="0.8" />
            <circle cx="60" cy="30" r="4" fill="url(#electricGradient)" opacity="0.6" />

            {/* S */}
            <text
                x="85"
                y="55"
                fontSize="64"
                fontWeight="900"
                fontFamily="Oswald, system-ui, sans-serif"
                fill="#FFFFFF"
            >
                S
            </text>

            {/* M */}
            <text
                x="135"
                y="55"
                fontSize="64"
                fontWeight="900"
                fontFamily="Oswald, system-ui, sans-serif"
                fill="#FFFFFF"
            >
                M
            </text>

            {/* A */}
            <text
                x="210"
                y="55"
                fontSize="64"
                fontWeight="900"
                fontFamily="Oswald, system-ui, sans-serif"
                fill="#FFFFFF"
            >
                A
            </text>

            {/* Audio wave decoration */}
            <path
                d="M 275 20 L 280 30 L 285 15 L 290 35 L 295 25 L 300 20"
                stroke="url(#electricGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M 275 35 L 280 45 L 285 30 L 290 50 L 295 40 L 300 35"
                stroke="url(#electricGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
            />

            {/* Tagline */}
            <text
                x="0"
                y="75"
                fontSize="11"
                fontWeight="600"
                fontFamily="DM Sans, sans-serif"
                fill="#888888"
                letterSpacing="1"
                className="uppercase"
            >
                Bahasa Instruksi Simbol Matematika Audio
            </text>
        </svg>
    );
}
