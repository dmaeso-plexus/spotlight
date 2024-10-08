"""Tests for the start page"""

import time
from pathlib import Path
from typing import Any

import pytest
from diffimg import diff
from PIL import Image
from selenium.webdriver.remote.webdriver import WebDriver

from .helpers import (
    get_tab,
    screenshot_exception,
    wait_for_tagged_element,
)


def take_and_diff_snapshot(
    webdriver: WebDriver,
    name: str,
    browser_name: str,
    results_folder: str,
) -> None:
    """Take a snapshot, store and create a diffimg to old screenshot (if exists)"""
    from ._autogenerated_ui_elements import DataTestTags  # noqa: F401

    old_screenshots_folder = Path(results_folder) / "old-screenshots"
    new_screenshots_folder = Path(results_folder) / "screenshots"

    new_screenshot_path = new_screenshots_folder / f"{name}-{browser_name}.png"
    diff_path = new_screenshots_folder / f"{name}-{browser_name}-diff.png"
    webdriver.save_screenshot(str(new_screenshot_path))
    reference_screenshot_path = old_screenshots_folder / f"{name}-{browser_name}.png"

    if reference_screenshot_path.is_file():
        # make sure both are in the same color mode
        im1 = Image.open(str(reference_screenshot_path))
        im2 = Image.open(str(new_screenshot_path))
        if im1.mode != im2.mode:
            im1 = im1.convert("RGB")
            im2 = im2.convert("RGB")
            im1.save(str(reference_screenshot_path))
            im2.save(str(new_screenshot_path))

        diff_ratio = diff(
            str(reference_screenshot_path),
            str(new_screenshot_path),
            diff_img_file=str(diff_path),
            ignore_alpha=True,
        )
        print(f"Computed difference of {diff_ratio}.")
        if diff_ratio < 0.000000001:
            diff_path.unlink()


def test_startpage(
    webdriver: WebDriver,
    loaded_image_example_dataset: Any,
    frontend_base_url: str,
    skip_tour: None,
) -> None:
    """
    create sceenshot and diff for startpage
    """
    from ._autogenerated_ui_elements import DataTestTags  # noqa: F401

    with screenshot_exception(webdriver):
        webdriver.get(frontend_base_url)
        driver = webdriver
        wait_for_tagged_element(webdriver, DataTestTags.HELP_BUTTON)

        # Create deterministic view for snapshots.
        tab = get_tab(driver, "Similarity Map")
        tab.click()
        tab = wait_for_tagged_element(webdriver, DataTestTags.DATAGRID_ALL_TAB_BUTTON)
        tab.click()

        time.sleep(3.0)
        take_and_diff_snapshot(
            webdriver, "gui", pytest.browser_name, pytest.results_folder  # type: ignore
        )
