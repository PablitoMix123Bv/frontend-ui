/**
 * Transform a raw PSI record into the Heimdall Investigation schema
 * (see api/src/models/Investigation.js).
 *
 * TODO: map PSI fields → schema. Keep provenance: always set sourceUrl.
 */
export function transformInvestigation(raw) {
  return {
    psiId: raw.id ?? null,
    title: raw.title ?? 'Untitled investigation',
    acronym: raw.acronym ?? null,
    objective: raw.objective ?? null,
    fuel: raw.fuel ?? null,
    gravityLevel: raw.gravityLevel ?? 'unknown',
    conditions: {
      oxygenPct: raw.oxygenPct ?? null,
      pressurePsi: raw.pressurePsi ?? null,
      flowVelocity: raw.flowVelocity ?? null,
      ambient: raw.ambient ?? null,
    },
    variables: raw.variables ?? [],
    sensors: raw.sensors ?? [],
    series: raw.series ?? [],
    earthApplications: raw.earthApplications ?? [],
    sourceUrl: raw.sourceUrl ?? null,
    tags: raw.tags ?? [],
  };
}
