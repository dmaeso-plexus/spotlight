"""
Integration Test on API level for h5 data sources
"""

import datasets
import httpx
import pytest

from renumics import spotlight

from .dataset import DATA


def test_get_table_returns_http_ok(dataset: datasets.Dataset) -> None:
    """
    Ensure /api/table/ returns a valid response
    """
    viewer = spotlight.show(dataset, no_browser=True, wait=False)
    response = httpx.Client(base_url=viewer.url).get("/api/table/")
    viewer.close()
    assert response.status_code == 200


@pytest.mark.parametrize("col", DATA.keys())
def test_get_cell_returns_http_ok(dataset: str, col: str) -> None:
    """
    Serve h5 dataset and get cell data for dtype
    """
    viewer = spotlight.show(dataset, no_browser=True, wait=False)
    gen_id = (
        httpx.Client(base_url=viewer.url).get("/api/table/").json()["generation_id"]
    )
    response = httpx.Client(base_url=viewer.url).get(
        f"/api/table/{col}/0?generation_id={gen_id}"
    )
    viewer.close()
    assert response.status_code == 200
