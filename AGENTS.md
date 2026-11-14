# Heimdall — dev guide

AI-powered dashboard for NASA PSI combustion-science investigations (spacecraft fire safety).

## Layout

| Dir | What runs there |
|---|---|
| `frontend/` | React 19 + Vite 8 + Three.js (R3F) + Recharts — port 5173 |
| `api/` | Node + Express 5 + Mongoose REST API — port 5000 |
| `analytics/` | Python + FastAPI analytics engine — port 8000 |
| `data/` | PSI ingestion: `raw/` → `ingestion/` → `processed/` → `npm run seed` (in api/) |
| `assets3d/` | `.blend` sources → exported `.gltf` → copy to `frontend/public/models/` |
| `docs/` | Project docs + README assets |

## Run

```bash
# Mongo (local option; Atlas also works — set MONGODB_URI in api/.env)
docker compose up -d mongo

# API
cd api && cp .env.example .env   # fill DEVIN_API_KEY, MONGODB_URI
npm run dev                      # http://localhost:5000/api/health

# Analytics
cd analytics && python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload    # http://localhost:8000/api/health

# Frontend (proxies /api → :5000)
cd frontend && npm run dev       # http://localhost:5173
```

## Notes

- Node code is ESM (`"type": "module"`), kebab-case files in `api/src`.
- AI calls go through `api/src/services/devin.service.js` (Devin API + SWE model, `DEVIN_*` env vars). The model must never invent numbers — prompts enforce this.
- Ranking is transparent: `ranking.service.js` returns per-factor score breakdowns.
- Python runs from the `analytics/` dir so `app.*` imports resolve.
