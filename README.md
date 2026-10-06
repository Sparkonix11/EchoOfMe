# abhishek-OS

My portfolio, built as a retro desktop operating system: a boot screen, draggable windows, a working
terminal, a Connect Four bot, skills as a game inventory and 5 hidden achievements. On phones it becomes a
home screen with full-screen apps.

Built with React 19, Vite and Tailwind CSS v4. No UI or animation libraries; the pixel icons are hand-drawn
12×12 maps in [`src/os/pixel.tsx`](src/os/pixel.tsx).

## Structure

- `src/os/` — the "operating system": window manager, windows, taskbar and start menu, boot screen, achievements
- `src/apps/` — one component per app window (About, Experience, Projects, Inventory, Terminal, Connect 4, …)
- `src/data/content.ts` — all text: profile, experience, projects, achievements, skills

## Editing content

All text lives in [`src/data/content.ts`](src/data/content.ts). App windows are listed in
[`src/os/appMeta.ts`](src/os/appMeta.ts) (title, icon, colour, default size).

The résumé button links to `/resume.pdf`. Export the résumé from Overleaf and save it as
`public/resume.pdf`.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import `Sparkonix11/EchoOfMe`.
3. Vercel reads `vercel.json` (Vite preset, `npm run build`, output `dist`). Click **Deploy**.

Every push to `main` redeploys automatically; other branches get preview URLs.

### Custom domain (optional)

In the Vercel project, open **Settings → Domains**, add your domain, and set the DNS records Vercel shows
(an `A` record to `76.76.21.21` for the apex domain, or a `CNAME` to `cname.vercel-dns.com` for a subdomain).
