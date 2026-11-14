import env from '../config/env.js';
import HttpError from '../utils/http-error.js';

const { apiKey, apiBase, model } = env.devin;

/**
 * Devin API client (SWE model) — OpenAI-compatible chat endpoint.
 * The model only receives values fetched from the DB / analytics engine,
 * so it writes prose about real data and says when data is missing.
 */
async function chat(messages, { temperature = 0.2 } = {}) {
  if (!apiKey) throw new HttpError(503, 'DEVIN_API_KEY is not configured');

  const res = await fetch(`${apiBase}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, messages, temperature }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new HttpError(502, `Devin API error ${res.status}`, { body: text });
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

const SUMMARY_SYSTEM = [
  'You are Heimdall, a scientific assistant for spacecraft fire safety.',
  'Summarize the combustion-science investigation strictly from the JSON provided.',
  'Never invent numbers. If a field is missing, say the data is not available.',
  'Return: objective, fuel, test conditions (O2 %, pressure, gravity), variables, sensors, and key findings.',
].join(' ');

export async function summarizeInvestigation(investigation) {
  const content = await chat([
    { role: 'system', content: SUMMARY_SYSTEM },
    { role: 'user', content: JSON.stringify(investigation, null, 2) },
  ]);
  return { summary: content, model };
}

const RAG_SYSTEM = [
  'You are Heimdall, a scientific assistant for spacecraft fire safety.',
  'Answer using ONLY the provided context excerpts from NASA PSI data.',
  'Cite the investigation acronym/title for every claim.',
  'If the context does not contain the answer, say so explicitly.',
].join(' ');

export async function answerQuestion(question, contextDocs) {
  const context = contextDocs
    .map((d, i) => `[${i + 1}] ${d.acronym ?? d.title}\n${d.aiSummary ?? d.objective ?? ''}`)
    .join('\n\n');

  const content = await chat([
    { role: 'system', content: RAG_SYSTEM },
    { role: 'user', content: `Context:\n${context}\n\nQuestion: ${question}` },
  ]);

  return {
    answer: content,
    citations: contextDocs.map((d) => ({ id: d._id, title: d.title, acronym: d.acronym })),
    model,
  };
}
