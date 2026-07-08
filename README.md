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
- **🔄 Group sync** *(optional)* — served over HTTP next to a booth server exposing `/api/inventory`,
  every device merges into one shared inventory (last-write-wins per item). Opened as a plain file,
  it stays happily local.

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
live tool and replace this file. Each visitor's own edits after that stay local to their browser
(localStorage) unless they Backup/Restore or use group sync — they don't get pushed back here.

## Stack

One vanilla HTML/CSS/JS file, localStorage, optional Anthropic Claude API (vision + text), optional
REST sync endpoint. Styled per the Outlandish Style Guide 2025 v1.2.
