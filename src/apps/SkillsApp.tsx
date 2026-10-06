import { skills } from '../data/content';

// Skills as a game inventory; each category gets a rarity tier.
const RARITY: Record<string, { tier: string; color: string }> = {
  Languages: { tier: 'Common', color: '#b8b8c8' },
  'Web + Mobile': { tier: 'Rare', color: '#5ee7ff' },
  'Data + Cloud': { tier: 'Epic', color: '#c084fc' },
  AI: { tier: 'Legendary', color: '#ff9f1c' },
};

export default function SkillsApp() {
  const total = skills.reduce((n, s) => n + s.items.length, 0);

  return (
    <div className="p-5 sm:p-7">
      <p className="font-pixel text-xs text-ink/60">
        {total} items · weight: worth it
      </p>

      <div className="mt-4 space-y-6">
        {skills.map((group) => {
          const r = RARITY[group.group] ?? RARITY.Languages;
          return (
            <section key={group.group}>
              <div className="flex items-baseline justify-between">
                <h3 className="font-pixel text-base">{group.group}</h3>
                <span className="border-2 border-ink px-1.5 font-pixel text-[10px]" style={{ background: r.color }}>
                  {r.tier}
                </span>
              </div>
              <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-2 border-ink bg-white px-2.5 py-2 text-sm shadow-[inset_0_-4px_0_var(--rarity)]"
                    style={{ ['--rarity' as string]: r.color }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
