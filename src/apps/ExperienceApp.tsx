import { education, experience } from '../data/content';
import { Bullet, Tag } from './ui';

export default function ExperienceApp() {
  return (
    <div className="p-5 sm:p-7">
      <p className="font-pixel text-xs text-ink/60">3 companies · 4 roles · 1 acquisition</p>

      <ol className="mt-4 space-y-5">
        {experience.map((r) => (
          <li key={`${r.company}-${r.title}`} className="border-2 border-ink bg-white shadow-[3px_3px_0_#121212]">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-ink bg-paper px-4 py-2.5">
              <h3 className="font-pixel text-lg">
                {r.company}
                {r.companyNote && <span className="ml-2 bg-lime px-1.5 py-0.5 text-[10px] align-middle">{r.companyNote}</span>}
              </h3>
              <p className="font-mono text-xs">{r.period}</p>
            </div>
            <div className="px-4 py-3.5">
              <p className="flex flex-wrap items-center gap-x-3 font-medium">
                {r.title}
                <span className="text-sm font-normal text-ink/60">· {r.location}</span>
                {r.url && (
                  <a href={r.url} target="_blank" rel="noreferrer" className="text-sm font-normal underline decoration-2 underline-offset-2 hover:bg-yellow">
                    {r.urlLabel} ↗
                  </a>
                )}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {r.points.map((p) => (
                  <Bullet key={p}>{p}</Bullet>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 border-2 border-dashed border-ink p-4">
        <p className="font-pixel text-xs text-ink/60">education.txt</p>
        <p className="mt-1 font-medium">{education.school}</p>
        <p className="text-sm">
          {education.degree} · {education.period}
        </p>
      </div>
    </div>
  );
}
