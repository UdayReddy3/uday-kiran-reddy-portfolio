# Sareddy Uday Kiran Reddy: Portfolio

Personal portfolio built with **Vite** (plain JavaScript, no framework). Sections: Home, About, Domains, Skills,
Projects (with project detail pages), Architecture visualizer, Certifications & Achievements, Resume, Contact.

## Project structure
```
index.html              page markup, SEO and Open Graph tags
src/main.js             page logic: rendering, architecture visualizer, routing, form
src/data.js             ALL your content: profile, projects, skills, domains, certificates, architecture
src/styles.css          the complete theme (navy background, cyan-blue-purple-magenta gradients)
public/
  images/               profile photo, project banners, certificate previews, resume preview
  certificates/         original certificate PDFs (Cisco Python Essentials 1, Udemy)
  Sareddy_Uday_Kiran_Reddy_Resume.pdf
  favicon.svg  robots.txt
vite.config.js  vercel.json  package.json  .env.example
```
Fonts (Inter, Playfair Display, JetBrains Mono) are installed from npm and bundled, so nothing loads from Google.

## Run locally
Requires [Node.js](https://nodejs.org) 18 or newer.
```bash
npm install
npm run dev        # http://localhost:5173
```
Other commands: `npm run build` (creates `dist/`) and `npm run preview` (serves the production build).

## Edit your content
Open `src/data.js`:
- `PROFILE`: email, LinkedIn, GitHub
- `PROJECTS`: add `gh` (repo URL) and `demo` (live URL) to show those buttons; edit descriptions and status
- `SK`: skills. Level `p` = project experience, `w` = working knowledge, `l` = learning
- `CERTS` and `EXPERIENCE`: add entries, images and `verify` links
- `ARCH`: architecture diagram steps

Replace images and PDFs in `public/` keeping the same file names (or update the paths in `data.js`).

## Contact form
By default the form validates and opens the visitor's email app with the message filled in (nothing is claimed as sent).
To send messages directly, create a form endpoint (for example at [formspree.io](https://formspree.io)) and set:
- locally: copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxx`
- on Vercel: Project Settings > Environment Variables > add `VITE_CONTACT_ENDPOINT`, then redeploy

## Deploy: GitHub + Vercel
1. Create an empty repository on GitHub (for example `portfolio`).
2. In this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/UdayReddy3/portfolio.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com) > **Add New > Project** > import the GitHub repository.
4. Vercel detects Vite automatically (settings also come from `vercel.json`): build command `npm run build`, output directory `dist`.
5. Click **Deploy**. Every `git push` to `main` redeploys automatically.
6. Optional: add a custom domain under Project Settings > Domains.

### Alternative: GitHub Pages
`vite.config.js` uses relative paths, so the built `dist/` folder works on a sub-path. Build, then publish `dist/`
(for example with the `gh-pages` package or a GitHub Actions workflow).

## Notes
- Navigation uses `#hash` links, so no server rewrite rules are needed.
- Project detail pages open at `#deepcrop`, `#braintumor` and `#cybersentinel`.
- Certificate verification: Cisco opens the QR popup (the link comes from the QR printed on the certificate); Udemy uses the URL printed on the certificate.
