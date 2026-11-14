from fastapi import APIRouter

from app.schemas.series import SeriesRequest, TrendsResponse
from app.services.trend_detection import analyze_series

router = APIRouter(tags=["trends"])


@router.post("/trends", response_model=TrendsResponse)
def trends(body: SeriesRequest) -> TrendsResponse:
    return analyze_series(body.series)
