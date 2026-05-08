import { useState } from 'react';

interface Props {
  src?: string;
  alt: string;
  className?: string;
}

export function PokemonImage({ src, alt, className }: Props) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return <PokeballPlaceholder className={className} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setErrored(true)}
      className={className}
    />
  );
}

function PokeballPlaceholder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="No image available"
      className={className}
    >
      <defs>
        <radialGradient id="ball-top" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#dc2626" />
        </radialGradient>
        <radialGradient id="ball-bottom" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="#e2e8f0" />
      <path
        d="M 8 50 a 42 42 0 0 1 84 0 Z"
        fill="url(#ball-top)"
      />
      <path
        d="M 8 50 a 42 42 0 0 0 84 0 Z"
        fill="url(#ball-bottom)"
      />
      <rect x="8" y="47" width="84" height="6" fill="#1f2937" />
      <circle cx="50" cy="50" r="9" fill="#1f2937" />
      <circle cx="50" cy="50" r="5" fill="#f8fafc" />
      <circle cx="50" cy="50" r="2.5" fill="#cbd5e1" />
    </svg>
  );
}
