from fastapi import APIRouter

from app.schemas.flammability import FlammabilityRequest, FlammabilityResponse
from app.services.flammability_map import build_map

router = APIRouter(tags=["flammability"])


@router.post("/flammability-map", response_model=FlammabilityResponse)
def flammability_map(body: FlammabilityRequest) -> FlammabilityResponse:
    return build_map(body.points, body.grid)
