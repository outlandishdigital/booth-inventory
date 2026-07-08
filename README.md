# 🦆 Outlandish Booth Inventory

A standalone, account-less **props & set-supplies inventory** for the Production team. Track every
prop, see instantly what's available vs. taken at a brand's booth, and match briefs or concept
photos to what's already on the shelves before anyone buys new.

Single HTML file. No build, no server, no accounts — open it in a browser and go.

## What it does

- **📦 Inventory table** — name, photo, type, color, dimensions, quantity, storage location, notes.
  Search, filter, and sort across everything (including AI keywords).
- **✅ / 📤 Booth checkout** — one click marks an item "Taken — at [brand]" so everyone knows where
  it went; one click returns it. Stats bar shows distinct items, units, availability, active booths.
- **🎯 Match a brief** — paste a brand brief and it scores your inventory against it, splits results
  into *available* / *taken*, and turns the gaps into a buy list with price ranges and sourcing tips.
- **📸 Match a photo** — upload a booth concept photo, describe it (or let Claude auto-describe it),
  and find matching props.
- **🏷️ Auto-tag photos** — Claude vision tags every item photo with search synonyms
  (cup → mug, drinkware, tumbler…) so search finds things people call by different names.
- **✨ Booth ideas** — give it a brand name and it picks 8–15 on-theme items from your inventory
  plus a short list worth sourcing.
- **🔄 Group sync** *(optional)* — point the app at the small server in `server/` (deploy steps
  below) and every device merges into one shared, real-time inventory (last-write-wins per item).
  Without it, the tool stays fully local per browser.

## Quick start

Open it live: **<https://outlandishdigital.github.io/booth-inventory/>** — no install, no login.
(Or download `index.html` and open it locally in Chrome or Edge.)

On first load the page seeds itself from `data/inventory-seed.json` (the current Production
inventory) into your browser's localStorage. After that, it's yours: edit freely, and use
**Backup** / **Restore** (JSON) to move your copy between machines, or **Export CSV** for
spreadsheets. Photos are resized and stored inline, so backups carry the images too.

## AI features & keys

The 🤖 features (auto-describe, auto-tag, booth ideas) call the Anthropic API **directly from the
browser** with a key you paste via the 🔑 button. The key is stored only in that browser's
localStorage and sent only to Anthropic — there is no middle server. Everything else works without
any key.

## Data

`data/inventory-seed.json` is the default inventory the page seeds on first load — it's committed
to this **public** repo, so its contents (item names, photos, and storage locations) are visible to
anyone, not just Outlandish. To update the shared starting point, export a fresh Backup from the
live tool and replace this file.

Without group sync (below), each visitor's edits after the initial seed stay local to their own
browser and don't get pushed back here.

## Group sync (real-time shared inventory)

By default every browser has its own private copy. To make it one live, shared dashboard everyone's
edits update in real time, deploy the small server in `server/` and point the app at it:

1. **Deploy `server/` to Render** — click **New → Blueprint** in the Render dashboard, connect this
   repo (`render.yaml` at the root configures it automatically), and set the `SYNC_KEY` env var to a
   passphrase of your choosing when prompted (this gates *writes* — reads are open, matching the
   rest of this public repo). Render gives you a URL like `https://booth-inventory-sync.onrender.com`.
2. **Point the app at it** — set `SYNC_BASE_URL` near the top of the "Group sync" script block in
   `index.html` to that URL, commit, and push. GitHub Pages redeploys automatically.
3. **Share the passphrase** — anyone who needs to *edit* the shared inventory pastes it once via the
   🔄 **Sync key** button in the header (stored in their browser only). Browsing/reading needs no key.

Once configured, the sync dot in the header shows **synced** and every save pushes to the server;
every open tab polls every 4s and merges changes (last-write-wins per item, by edit timestamp).

**Known limitation:** the server persists to a local file that's seeded from
`data/inventory-seed.json` on first boot, but a Render **redeploy** resets that file back to the
seed snapshot (Render's free-tier disk isn't durable across deploys). Export a Backup periodically
if you want a stronger safety net, or ask for a durable-storage upgrade if this becomes a problem.

## Stack

Frontend: one vanilla HTML/CSS/JS file, localStorage, optional Anthropic Claude API (vision + text).
Sync backend (optional): small Express server (`server/`), file-backed, deployed separately.
Styled per the Outlandish Style Guide 2025 v1.2.
