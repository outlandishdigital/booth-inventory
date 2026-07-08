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

Download `index.html`, open it in Chrome or Edge. That's it.

- Data lives in the browser's localStorage. Use **Backup** / **Restore** (JSON) to move it between
  machines, and **Export CSV** for spreadsheets.
- Photos are resized and stored inline, so backups carry the images too.

## AI features & keys

The 🤖 features (auto-describe, auto-tag, booth ideas) call the Anthropic API **directly from the
browser** with a key you paste via the 🔑 button. The key is stored only in that browser's
localStorage and sent only to Anthropic — there is no middle server. Everything else works without
any key.

## Data

The `data/` folder (internal inventory exports, e.g. `inventory-seed.json`) is **gitignored** —
inventory contents stay off GitHub. Share inventory via the Backup/Restore JSON flow or the group
sync server, not commits.

## Stack

One vanilla HTML/CSS/JS file, localStorage, optional Anthropic Claude API (vision + text), optional
REST sync endpoint. Styled per the Outlandish Style Guide 2025 v1.2.
