"""Trend / peak / drop detection over time series.

TODO: implement with scipy.signal.find_peaks + rolling statistics.
Keep results explainable — every event must cite its detection rule.
"""

from app.schemas.series import Series, SeriesTrends, TrendsResponse


def analyze_series(series: list[Series]) -> TrendsResponse:
    results = [SeriesTrends(name=s.name, events=[]) for s in series]
    return TrendsResponse(results=results)
