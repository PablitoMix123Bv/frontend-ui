"""Flammability map: probability grid over (O2 %, flow velocity).

TODO: interpolate experimental points onto the grid with uncertainty
intervals. Cells without data coverage must stay None — honest bounds,
never invented numbers.
"""

from app.schemas.flammability import (
    Cell,
    FlammabilityPoint,
    FlammabilityResponse,
    GridSpec,
)


def build_map(points: list[FlammabilityPoint], grid: GridSpec) -> FlammabilityResponse:
    o2_step = (grid.o2_max - grid.o2_min) / grid.resolution
    v_step = (grid.vel_max - grid.vel_min) / grid.resolution

    cells = [
        Cell(
            oxygen_pct=grid.o2_min + i * o2_step,
            flow_velocity=grid.vel_min + j * v_step,
        )
        for i in range(grid.resolution)
        for j in range(grid.resolution)
    ]
    return FlammabilityResponse(cells=cells)
