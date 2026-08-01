# rhyschang.com — site design

**Date:** 2026-07-31
**Status:** Implemented (home page + `/howto`)

## Purpose

A personal site for Rhys Chang whose first page is a self-documenting handoff
guide: instructions complete enough that a total beginner can set up, edit, and
publish the site themselves using Claude Code or Codex, with no ongoing help.

The guide is the product. The rest of the site follows later.

## Audience

A total beginner, kid-friendly — pitched at roughly a five-year-old. No GitHub
account, no terminal experience, no coding. Every dev concept is explained on
first use or avoided.

A five-year-old cannot actually install Node or use a terminal alone. Rather
than pretend otherwise, the guide carries "grown-up helps" badges on the four
steps that genuinely need an adult (GitHub account, Node install, tool install,
sign-in), and both pages end by pointing at Uncle Jimmy. The page is written to
be read *with* someone, not alone.

This constraint drove most decisions below.

## Decisions

### Stack: plain HTML/CSS, no build step

Chosen over Astro (the `shengchangmd` pattern) because a toolchain adds three
failure points — Node install, `npm install`, build step — before a beginner can
see their first change. Plain files mean: edit, push, live.

Mirrors `jameschang.co`. Cost: no components, so shared markup is duplicated
across pages. Acceptable at this size; revisit past roughly five pages.

### Tool coverage: both, two columns

Claude Code and Codex are shown side by side at every step, Claude Code left,
Codex right.

A single-tool linear guide would be easier to follow, and a pick-once toggle
would have given full coverage with a linear read. Both were considered and
rejected in favour of literal side-by-side, which is what was wanted: the reader
can see both tools at once and compare.

The known cost is mobile. Columns stack, so a Claude Code reader scrolls past
Codex content between steps. Mitigated in CSS rather than content: each column
carries a permanent uppercase label and a coloured left border, so a scrolling
reader can identify "not my column" instantly. CSS Grid, not tables — tables
would lock the columns together and prevent the stack.

### Repo: `thirstypig/rhyschang`, Rhys as collaborator

Lives in the existing account alongside `jameschang.co` and `shengchangmd`.
Rhys gets write access rather than ownership, so James retains admin and can
repair things. Invite pending.

### Hosting: GitHub Pages, deploy from branch

No Actions workflow. Pages watches `main` and rebuilds on push. `CNAME` holds
the bare apex domain; `.nojekyll` prevents Jekyll from silently dropping files
beginning with `_` or `.` — a real hazard when a beginner names a file.

### DNS: replace, not add

The domain was registered 2026-07-30 at Squarespace and pointed at Squarespace's
own hosting (`198.185.159.x`, `198.49.23.x`, `www → ext-sq.squarespace.com`).
Squarespace's default records had to be deleted before the domain could point
elsewhere; leaving them in place blocks the switch.

Replaced with GitHub's four apex A records, one AAAA record, and
`www → thirstypig.github.io`. Verified live before launch.

### Visual language: whimsical, with a day/night switch

Fredoka (display) over Nunito (body). Sky-blue day palette, deep-indigo night
palette, four accents: pink, marigold, mint, grape. Chunky 3px outlines with
hard offset shadows rather than soft blurs — the look reads as sticker-book
rather than corporate card UI.

The signature element is the ideas list: each idea is a tilted sticker that
straightens and lifts on hover. It encodes something true — these are things
that can be peeled off and stuck onto the site.

Light and dark are a manual toggle, not `prefers-color-scheme`. A child should
be able to press a button and see the site change; following an OS setting they
can't find is invisible. The choice persists in `localStorage`, and an inline
head script applies it before first paint so the page never flashes the wrong
theme.

### No port claimed

A static site with no build needs no dev server. This also sidesteps a capacity
problem: `MASTER-PORTS.md` has one reserved block left (3130–3139) and three new
sibling folders appeared on 2026-07-31 (`rhyschang`, `jarrenchang`,
`tobinchang`). That allocation needs resolving, but not by this project.

## Page structure

```
index.html        home — name, ideas stickers, family links, handover promise
howto/index.html  the guide
style.css         shared
theme.js          day/night toggle
favicon.svg       grape tile, white R
```

The home page carries outbound links to `tobinchang.com`, `jarrenchang.com`,
and `jameschang.co/now`. All three were verified live before linking — a dead
link on a child's page reads as a broken site.

It also states plainly that Uncle Jimmy currently holds the domain and hosting,
and promises to transfer both when Rhys is ready.

`/howto` is `howto/index.html`, not `howto.html`, so the URL has no extension.

### Guide sections

1. What this site is — files, GitHub, Pages, and the change → push → wait loop
2. One-time setup — account, invite, terminal, install, sign in, clone
3. First change — one word, end to end
4. What just happened — commit, push, build, named so errors become readable
5. Adding a page — the `folder/index.html` pattern
6. Prompts that work — copy-paste bank, easy to ambitious, plus failure modes
7. When something breaks — undo, stale cache, pasting errors verbatim

Every instruction references this repo's real paths, so following the guide is
also how it gets tested.

## Verification

No test framework — disproportionate here. Checklist instead:

- [x] Both pages return 200 at the custom domain
- [x] `/howto` redirects to `/howto/` and serves the guide
- [x] Two-column blocks present and stacking below 44rem
- [x] HTTPS certificate issued, Enforce HTTPS on, `www` redirects to apex
- [x] Day/night toggle switches and persists; no flash of wrong theme on load
- [x] Family cards share one row at equal height (measured, not eyeballed)
- [x] Outbound links verified live before shipping
- [ ] Collaborator invite sent and accepted

## Open items

- Three optional AAAA records remain unadded (one of four present). Cosmetic —
  affects IPv6-only visitors only.
- Home page copy is still generic and needs real content about Rhys.
- The sixteen idea stickers are guesses. Replacing several with Rhys's actual
  interests would make the page land much harder.
- Prompt bank is generic for the same reason.
