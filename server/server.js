const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4300;
const SYNC_KEY = process.env.SYNC_KEY || '';
const DATA_FILE = path.join(__dirname, 'data.json');
const SEED_FILE = path.join(__dirname, '..', 'data', 'inventory-seed.json');

let rev = 0;
let items = [];

function load() {
  try {
    const raw = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    items = raw.items || [];
    rev = raw.rev || 0;
    console.log(`Loaded ${items.length} items from disk (rev ${rev})`);
    return;
  } catch (e) {
    // no on-disk store yet — fall through to seeding
  }
  try {
    items = JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));
    rev = 1;
    persist();
    console.log(`Seeded ${items.length} items from inventory-seed.json`);
  } catch (e) {
    console.log('No seed file found — starting empty');
  }
}

function persist() {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ rev, items }), 'utf8');
}

load();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'booth-inventory-sync', items: items.length, rev });
});

app.get('/api/inventory', (req, res) => {
  const clientRev = Number(req.query.rev);
  if (Number.isFinite(clientRev) && clientRev === rev) {
    return res.json({ rev, unchanged: true });
  }
  res.json({ rev, items });
});

app.put('/api/inventory', (req, res) => {
  if (!SYNC_KEY) {
    return res.status(401).json({ error: 'Server has no SYNC_KEY configured — writes are disabled.' });
  }
  if (req.get('x-sync-key') !== SYNC_KEY) {
    return res.status(401).json({ error: 'Invalid or missing sync key.' });
  }
  const body = req.body || {};
  if (!Array.isArray(body.items)) {
    return res.status(400).json({ error: 'Expected { items: [...] }' });
  }
  items = body.items;
  rev += 1;
  persist();
  res.json({ rev });
});

app.listen(PORT, () => {
  console.log(`Booth inventory sync server listening on :${PORT}`);
  if (!SYNC_KEY) {
    console.log('WARNING: SYNC_KEY is not set — the API will reject all writes until it is.');
  }
});
