import { useEffect, useState } from 'react';
import { oldProjects } from '../data/content';
import { useEggs } from '../os/eggsContext';
import PixelIcon from '../os/pixel';
import { PixelButton } from './ui';

export default function RecycleBinApp() {
  const { unlock } = useEggs();
  const [refused, setRefused] = useState(false);

  useEffect(() => unlock('bin'), [unlock]);

  return (
    <div className="p-5">
      <p className="text-sm text-ink/75">
        Early student projects. Not on the résumé anymore, but this is where I learned everything.
      </p>
      <ul className="mt-4 divide-y-2 divide-ink/10 border-2 border-ink bg-white">
        {oldProjects.map((p) => (
          <li key={p.name} className="flex items-center gap-3 px-3 py-2 text-sm">
            <PixelIcon name="document" size={22} className="shrink-0 opacity-70" />
            <div className="min-w-0 flex-1">
              {p.url ? (
                <a href={p.url} target="_blank" rel="noreferrer" className="font-medium underline decoration-ink/30 underline-offset-2 hover:bg-yellow">
                  {p.name}
                </a>
              ) : (
                <span className="font-medium">{p.name}</span>
              )}
              <p className="truncate text-xs text-ink/60">{p.note}</p>
            </div>
            <span className="font-mono text-xs text-ink/50">{p.year}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-3">
        <PixelButton onClick={() => setRefused(true)}>Empty bin</PixelButton>
        {refused && <p className="font-pixel text-xs text-red">Can&rsquo;t. Sentimental value.</p>}
      </div>
    </div>
  );
}
