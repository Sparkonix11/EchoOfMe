import { achievements } from '../data/content';
import { EGGS, useEggs } from '../os/eggsContext';
import PixelIcon from '../os/pixel';

export default function AchievementsApp() {
  const { found } = useEggs();

  return (
    <div className="p-5 sm:p-7">
      <h3 className="font-pixel text-lg">Real-life trophies</h3>
      <ul className="mt-3 space-y-3">
        {achievements.map((a) => (
          <li key={a.title} className="flex gap-3 border-2 border-ink bg-white p-3 shadow-[3px_3px_0_#121212]">
            <PixelIcon name="trophy" size={40} className="shrink-0" />
            <div>
              <p className="font-pixel text-sm">{a.title}</p>
              <p className="mt-0.5 text-sm text-ink/75">{a.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-baseline justify-between">
        <h3 className="font-pixel text-lg">Desktop secrets</h3>
        <p className="font-pixel text-xs">
          {found.length}/{EGGS.length} found
        </p>
      </div>
      <div className="mt-2 h-3 border-2 border-ink bg-white">
        <div className="h-full bg-pink transition-[width]" style={{ width: `${(found.length / EGGS.length) * 100}%` }} />
      </div>
      <ul className="mt-3 space-y-2">
        {EGGS.map((e) => {
          const got = found.includes(e.id);
          return (
            <li key={e.id} className={`flex items-center gap-3 border-2 border-ink p-2.5 ${got ? 'bg-lime' : 'bg-paper text-ink/50'}`}>
              <span className="font-pixel text-lg" aria-hidden="true">
                {got ? '★' : '?'}
              </span>
              <div>
                <p className="font-pixel text-sm">{got ? e.title : '???'}</p>
                <p className="text-xs">{got ? e.desc : 'Locked. Keep exploring.'}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
