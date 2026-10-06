import { profile, stats } from '../data/content';
import { useWM } from '../os/wmContext';
import { PixelButton } from './ui';

export default function Welcome() {
  const { open } = useWM();

  return (
    <div className="p-5 sm:p-7">
      <p className="flex items-center gap-2 font-pixel text-xs">
        <span className="blink inline-block h-2.5 w-2.5 bg-green" aria-hidden="true" />
        open to SDE + AI engineering roles
      </p>

      <h2 className="mt-5 font-pixel text-3xl leading-tight sm:text-4xl">
        Hi, I&rsquo;m {profile.name}<span className="wave inline-block" aria-hidden="true">👋</span>
      </h2>
      <p className="mt-2 font-pixel text-lg text-ink/70">{profile.role}</p>
      <p className="mt-4 max-w-prose leading-relaxed">{profile.tagline}</p>

      <dl className="mt-6 grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="border-2 border-ink p-3"
            style={{ background: ['#b6f542', '#ffd23f', '#5ee7ff', '#ff7ac6'][i % 4] }}
          >
            <dd className="font-pixel text-2xl">{s.value}</dd>
            <dt className="mt-1 text-xs">{s.label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <PixelButton tone="ink" onClick={() => open('experience')}>
          Experience →
        </PixelButton>
        <PixelButton onClick={() => open('projects')}>Projects</PixelButton>
        <PixelButton tone="yellow" href={profile.resumeUrl} external>
          résumé.pdf
        </PixelButton>
        <PixelButton tone="pink" onClick={() => open('contact')}>
          Say hi
        </PixelButton>
      </div>

      <p className="mt-6 border-t-2 border-dashed border-ink/30 pt-4 text-sm text-ink/70">
        <span className="font-pixel text-xs">tip:</span> this desktop hides 5 achievements. Start with the{' '}
        <button type="button" onClick={() => open('terminal')} className="underline decoration-2 underline-offset-2 hover:bg-lime">
          terminal
        </button>
        .
      </p>
    </div>
  );
}
