import { useEffect, type ReactNode } from 'react';
import { ALL_APP_IDS, APPS, DESKTOP_ORDER, type AppId } from './appMeta';
import { useWM } from './wmContext';
import { useEggs } from './eggsContext';
import PixelIcon from './pixel';
import Window from './Window';
import Taskbar from './Taskbar';
import { profile } from '../data/content';
import Welcome from '../apps/Welcome';
import ExperienceApp from '../apps/ExperienceApp';
import ProjectsApp from '../apps/ProjectsApp';
import AchievementsApp from '../apps/AchievementsApp';
import SkillsApp from '../apps/SkillsApp';
import TerminalApp from '../apps/TerminalApp';
import ContactApp from '../apps/ContactApp';
import ConnectFourApp from '../apps/ConnectFourApp';
import RecycleBinApp from '../apps/RecycleBinApp';

const CONTENT: Record<AppId, () => ReactNode> = {
  welcome: () => <Welcome />,
  experience: () => <ExperienceApp />,
  projects: () => <ProjectsApp />,
  achievements: () => <AchievementsApp />,
  skills: () => <SkillsApp />,
  terminal: () => <TerminalApp />,
  contact: () => <ContactApp />,
  connect4: () => <ConnectFourApp />,
  bin: () => <RecycleBinApp />,
};

export default function Desktop({ onShutdown }: { onShutdown: () => void }) {
  const { wins, opened, open } = useWM();
  const { unlock } = useEggs();

  useEffect(() => {
    if (ALL_APP_IDS.every((id) => opened.includes(id))) unlock('explorer');
  }, [opened, unlock]);

  return (
    <div className="wallpaper fixed inset-0 overflow-hidden">
      <div className="sun" aria-hidden="true" />
      <p
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 right-6 select-none font-pixel text-4xl text-white/15 sm:text-6xl"
      >
        abhishek-OS
      </p>

      <h1 className="sr-only">
        {profile.name} — {profile.role}. Portfolio styled as a desktop operating system.
      </h1>

      <ul
        aria-label="Desktop"
        className="relative z-[1] grid h-[calc(100dvh-48px)] grid-cols-4 content-start gap-1 p-3 sm:grid-flow-col sm:grid-cols-none sm:grid-rows-[repeat(auto-fill,92px)] sm:content-normal sm:justify-start"
      >
        {DESKTOP_ORDER.map((id) =>
          id === 'resume' ? (
            <li key={id}>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="desk-icon">
                <PixelIcon name="document" size={44} />
                <span>resume.pdf</span>
              </a>
            </li>
          ) : (
            <li key={id}>
              <button type="button" onClick={() => open(id)} className="desk-icon">
                <PixelIcon name={APPS[id].icon} size={44} />
                <span>{APPS[id].label}</span>
              </button>
            </li>
          ),
        )}
      </ul>

      {wins.map((w) => (
        <Window key={w.id} win={w}>
          {CONTENT[w.id]()}
        </Window>
      ))}

      <Taskbar onShutdown={onShutdown} />
    </div>
  );
}
