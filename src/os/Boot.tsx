import { useEffect, useState } from 'react';

const LINES = [
  'abhishek-OS v26.10  (build 1854-knight)',
  'Copyright (C) 2022-2026 IIT Madras Data Science',
  '',
  'Checking memory ................ 1.4M chunks  OK',
  'Mounting SignSetu.app .......... 4K+ users    OK',
  'Loading GyanAlign.dll .......... 42K judgments OK',
  'Starting LangGraph agents ...... 18 nodes     OK',
  'Calibrating Connect Four bot ... ready        OK',
  '',
  'Welcome back.',
];

// Short fake boot log. Skippable with any key or click.
export default function Boot({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= LINES.length) {
      const t = setTimeout(onDone, 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 250 : 150);
    return () => clearTimeout(t);
  }, [shown, onDone]);

  useEffect(() => {
    window.addEventListener('keydown', onDone);
    return () => window.removeEventListener('keydown', onDone);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[10000] cursor-pointer bg-[#0a0a0a] p-6 font-mono text-sm text-lime sm:p-10 sm:text-base"
      onClick={onDone}
      role="presentation"
    >
      <pre className="whitespace-pre-wrap leading-relaxed">
        {LINES.slice(0, shown).join('\n')}
        <span className="blink">█</span>
      </pre>
      <p className="absolute bottom-6 right-6 font-pixel text-xs text-cream/50">press any key to skip</p>
    </div>
  );
}
