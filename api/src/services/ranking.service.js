/**
 * Transparent scenario-based ranking.
 * score = Σ weight_i × factor_i — every factor and its contribution
 * is returned in the breakdown so nothing is a black box.
 */

const FACTORS = {
  gravityMatch: (inv, s) =>
    inv.gravityLevel === s.gravity ? 1 : inv.gravityLevel === 'microgravity' ? 0.5 : 0.2,

  atmosphereMatch: (inv, s) => {
    if (inv.conditions?.oxygenPct == null || s.oxygenPct == null) return 0;
    const dO2 = Math.abs(inv.conditions.oxygenPct - s.oxygenPct) / s.oxygenPct;
    const dP = inv.conditions.pressurePsi != null && s.pressurePsi != null
      ? Math.abs(inv.conditions.pressurePsi - s.pressurePsi) / s.pressurePsi
      : 0;
    return Math.max(0, 1 - (dO2 + dP) / 2);
  },

  dataRichness: (inv) => {
    const pts = inv.series?.reduce((n, s) => n + (s.samples?.length ?? 0), 0) ?? 0;
    return Math.min(1, pts / 500);
  },

  documentation: (inv) =>
    [inv.objective, inv.fuel, inv.sensors?.length, inv.variables?.length]
      .filter(Boolean).length / 4,
};

export function rankInvestigations(investigations, scenario, weights = {}) {
  const names = Object.keys(FACTORS);
  const w = Object.fromEntries(
    names.map((n) => [n, weights[n] ?? 1 / names.length])
  );
  const total = names.reduce((s, n) => s + w[n], 0) || 1;

  return investigations
    .map((inv) => {
      const breakdown = names.map((name) => {
        const value = FACTORS[name](inv, scenario);
        return { factor: name, value, weight: w[name], contribution: (value * w[name]) / total };
      });
      const score = breakdown.reduce((s, b) => s + b.contribution, 0);
      return { investigation: inv, score: Number(score.toFixed(4)), breakdown };
    })
    .sort((a, b) => b.score - a.score);
}
