import { useState } from 'react';
import { projects } from '../data/content';
import PixelIcon from '../os/pixel';
import { Bullet, PixelButton, Tag } from './ui';

export default function ProjectsApp() {
  const [sel, setSel] = useState(0);
  const p = projects[sel];

  return (
    <div className="flex h-full flex-col sm:flex-row">
      <ul
        aria-label="Project files"
        className="flex shrink-0 gap-1 overflow-x-auto border-b-2 border-ink bg-paper p-2 sm:w-52 sm:flex-col sm:overflow-x-visible sm:border-b-0 sm:border-r-2"
      >
        {projects.map((proj, i) => (
          <li key={proj.name}>
            <button
              type="button"
              aria-current={i === sel}
              onClick={() => setSel(i)}
              className={`flex w-full items-center gap-2 px-2 py-2 text-left text-sm whitespace-nowrap sm:whitespace-normal ${
                i === sel ? 'bg-ink text-cream' : 'hover:bg-yellow'
              }`}
            >
              <PixelIcon name="folder" size={22} />
              {proj.name}
            </button>
          </li>
        ))}
      </ul>

      <article className="min-w-0 flex-1 overflow-auto p-5 sm:p-7">
        <h3 className="font-pixel text-2xl leading-tight">{p.name}</h3>
        <p className="mt-2 text-ink/80">{p.summary}</p>
        <ul className="mt-4 space-y-2 text-sm">
          {p.points.map((pt) => (
            <Bullet key={pt}>{pt}</Bullet>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {p.github && (
            <PixelButton tone="ink" href={p.github} external>
              view code ↗
            </PixelButton>
          )}
          {p.live && (
            <PixelButton tone="lime" href={p.live} external>
              live demo ↗
            </PixelButton>
          )}
        </div>
      </article>
    </div>
  );
}
