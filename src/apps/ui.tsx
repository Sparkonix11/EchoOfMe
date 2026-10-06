import type { ReactNode } from 'react';

// Shared building blocks for app windows.

export function Tag({ children }: { children: ReactNode }) {
  return <span className="inline-block border-2 border-ink bg-white px-1.5 py-0.5 font-mono text-[11px]">{children}</span>;
}

export function PixelButton({
  children,
  onClick,
  href,
  tone = 'cream',
  external,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  tone?: 'cream' | 'lime' | 'pink' | 'yellow' | 'ink';
  external?: boolean;
}) {
  const tones = {
    cream: 'bg-cream text-ink',
    lime: 'bg-lime text-ink',
    pink: 'bg-pink text-ink',
    yellow: 'bg-yellow text-ink',
    ink: 'bg-ink text-cream',
  };
  const cls = `inline-flex items-center gap-2 border-2 border-ink px-3 py-1.5 font-pixel text-xs shadow-[3px_3px_0_#121212] transition-transform hover:-translate-y-0.5 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${tones[tone]}`;
  if (href) {
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5 leading-relaxed">
      <span className="mt-[0.55em] h-2 w-2 shrink-0 bg-ink" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}
