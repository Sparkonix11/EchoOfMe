import { useState } from 'react';
import { profile } from '../data/content';
import { PixelButton } from './ui';

// Composes an email in the visitor's own mail app; nothing is sent from this site.
export default function ContactApp() {
  const [subject, setSubject] = useState('Saw your portfolio — let’s talk');
  const [body, setBody] = useState('');
  const [copied, setCopied] = useState(false);

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-2 border-b-2 border-ink bg-paper p-4 text-sm">
        <p className="flex gap-2">
          <span className="w-16 font-pixel text-xs leading-5">To:</span>
          <span className="border-2 border-ink bg-white px-2">{profile.email}</span>
        </p>
        <label className="flex items-center gap-2">
          <span className="w-16 font-pixel text-xs">Subject:</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="min-w-0 flex-1 border-2 border-ink bg-white px-2 py-1 outline-none focus:bg-yellow/30"
          />
        </label>
      </div>
      <label className="flex min-h-0 flex-1 flex-col p-4">
        <span className="sr-only">Message</span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Hi Abhishek, we're hiring for…"
          className="min-h-32 flex-1 resize-none border-2 border-ink bg-white p-3 text-sm outline-none focus:bg-yellow/20"
        />
      </label>
      <div className="flex flex-wrap items-center gap-3 border-t-2 border-ink p-4">
        <PixelButton tone="lime" href={mailto}>
          Send ✉
        </PixelButton>
        <PixelButton onClick={copy}>{copied ? 'Copied!' : 'Copy email'}</PixelButton>
        <span className="ml-auto flex gap-3 text-sm">
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="underline decoration-2 underline-offset-2 hover:bg-yellow">
            LinkedIn
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="underline decoration-2 underline-offset-2 hover:bg-yellow">
            GitHub
          </a>
        </span>
      </div>
    </div>
  );
}
