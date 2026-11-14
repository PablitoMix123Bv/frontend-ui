import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import env from '../config/env.js';
import { connectDB, disconnectDB } from '../config/db.js';
import Investigation from '../models/Investigation.js';

const SEED_DIR = path.resolve(import.meta.dirname, '../../../data/processed');

async function main() {
  await connectDB();
  const files = (await readdir(SEED_DIR)).filter((f) => f.endsWith('.json'));
  let inserted = 0;

  for (const file of files) {
    const docs = JSON.parse(await readFile(path.join(SEED_DIR, file), 'utf8'));
    const list = Array.isArray(docs) ? docs : [docs];
    const res = await Investigation.insertMany(list, { ordered: false }).catch((e) => e);
    inserted += res.insertedCount ?? list.length;
  }

  console.log(`[seed] ${inserted} investigations loaded into ${env.mongoUri}`);
  await disconnectDB();
}

main().catch((err) => {
  console.error('[seed] failed:', err);
  process.exit(1);
});
