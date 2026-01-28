import React, { useId } from 'react';

interface Props {
  className?: string;
}

const ScienceUXLogo: React.FC<Props> = ({ className }) => {
  const uniqueId = useId();
  // Ensure the ID is safe for use in URL references by removing colons which are common in useId output
  const gradientId = `logo-gradient-${uniqueId.replace(/:/g, '')}`;

  return (
    <a href="https://scienceux.org/" target="_blank" rel="noopener noreferrer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 190 40"
        className={className}
        role="img"
        aria-label="ScienceUX Logo"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="30" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>

        {/* Icon: Hexagon Molecule */}
        <g transform="translate(5, 5)">
          {/* Main Hexagon Background */}
          <path
            d="M15 0L27.99 7.5V22.5L15 30L2.01 22.5V7.5L15 0Z"
            fill={`url(#${gradientId})`}
          />

          {/* Inner Structure */}
          <path
            d="M15 6L22 10V19L15 23L8 19V10L15 6Z"
            fill="white"
            fillOpacity="0.2"
          />

          {/* Connecting Nodes */}
          <circle cx="15" cy="15" r="3" fill="white" />
          <circle cx="15" cy="5" r="1.5" fill="white" fillOpacity="0.7" />
          <circle cx="23.5" cy="20" r="1.5" fill="white" fillOpacity="0.7" />
          <circle cx="6.5" cy="20" r="1.5" fill="white" fillOpacity="0.7" />
        </g>

        {/* Text: Science */}
        <text
          x="45"
          y="28"
          fontFamily='"Inter", sans-serif'
          fontWeight="800"
          fontSize="24"
          className="fill-slate-900"
          style={{ letterSpacing: '-0.02em' }}
        >
          Science
        </text>

        {/* Text: UX */}
        <text
          x="138"
          y="28"
          fontFamily='"Inter", sans-serif'
          fontWeight="300"
          fontSize="24"
          className="fill-indigo-600"
          style={{ letterSpacing: '0.05em' }}
        >
          UX
        </text>
      </svg>
    </a>
  );
};

export default ScienceUXLogo;