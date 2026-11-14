import app from './app.js';
import env from './config/env.js';
import { connectDB } from './config/db.js';

async function main() {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`[api] heimdall-api listening on http://localhost:${env.port}`);
  });
}

main().catch((err) => {
  console.error('[api] fatal startup error:', err);
  process.exit(1);
});
