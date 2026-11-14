from pydantic import BaseModel


class Series(BaseModel):
    name: str
    unit: str | None = None
    samples: list[list[float]]  # [t, value] pairs


class SeriesRequest(BaseModel):
    series: list[Series]


class TrendEvent(BaseModel):
    kind: str           # "peak" | "drop" | "trend_change"
    t: float
    value: float
    detail: str | None = None


class SeriesTrends(BaseModel):
    name: str
    events: list[TrendEvent]


class TrendsResponse(BaseModel):
    results: list[SeriesTrends]
