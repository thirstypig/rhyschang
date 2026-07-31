# rhyschang.com

Personal site for Rhys Chang. Plain HTML and CSS, no build step, published with
GitHub Pages on the apex domain `rhyschang.com`.

## Why no framework

The site is meant to be managed by a beginner using Claude Code or Codex. Every
build tool between "edit a file" and "see it live" is another thing that can
break in someone's first ten minutes. So: no Node, no bundler, no `npm install`.
Edit a file, push, wait a minute.

This mirrors `jameschang.co` rather than `shengchangmd`, which uses Astro.

## Layout

```
CNAME            hostname for GitHub Pages — must be the bare domain, one line
.nojekyll        stops Jekyll from silently dropping files that start with _
index.html       home page (placeholder)
howto/index.html the guide, served at /howto
style.css        shared styles for every page
```

A new page at `/name` is a folder `name/` containing `index.html`. That is what
keeps URLs clean — `name.html` would be served at the uglier `/name.html`.

## Local preview

No dev server and no port claimed in the registry. Open `index.html` in a
browser, or if you want real URLs:

```bash
python3 -m http.server 8000
```

## Deploying

Push to `main`. GitHub Pages rebuilds automatically, typically under a minute.
There is no Actions workflow — Pages is configured to deploy from the branch.

## DNS

Registered at Squarespace. The Squarespace default records were removed and
replaced with GitHub's:

| Type  | Name  | Value                                              |
|-------|-------|----------------------------------------------------|
| A     | `@`   | `185.199.108.153` `.109.153` `.110.153` `.111.153` |
| AAAA  | `@`   | `2606:50c0:8000::153` (optional, IPv6 only)        |
| CNAME | `www` | `thirstypig.github.io`                             |

The `www` CNAME target has no repository name on the end — that is a common
mistake and breaks the connection.

## Docs

- [`docs/superpowers/specs/2026-07-31-rhyschang-site-design.md`](docs/superpowers/specs/2026-07-31-rhyschang-site-design.md) — design decisions and rationale
- [`MASTER-PORTS.md`](MASTER-PORTS.md) / [`PORTS.md`](PORTS.md) — workspace-wide port registry (mirrored copies, per convention)
