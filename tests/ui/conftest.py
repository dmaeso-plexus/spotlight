"""conftest for ui-tests"""

import json
import subprocess
from pathlib import Path
from typing import Any, Dict, Generator

import pytest
import requests
from selenium import webdriver as wd
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.remote.webdriver import WebDriver

from .generate_ui_test_elements import generate_ui_test_elements_py


def pytest_sessionstart(
    session: pytest.Session,
) -> None:
    """
    Called after the Session object has been created and
    before performing collection and entering the run test loop.
    """
    try:
        generate_ui_test_elements_py()
    except OSError as error:
        print(f"Could not write 'update _autogenerated_ui_elements.py': {error}")


def pytest_addoption(parser):  # type: ignore
    """pass command line options"""
    parser.addoption(
        "--frontendBaseUrl", action="store", default="http://localhost:3000"
    )
    parser.addoption(
        "--backendBaseUrl", action="store", default="http://localhost:5000"
    )
    parser.addoption("--browser", action="store", default="chrome")
    parser.addoption("--headless", action="store_true", default=False)
    parser.addoption("--testDataPath", action="store", default="build/datasets/")
    parser.addoption("--resultsFolder", action="store", default="build/ui_tests/")


@pytest.fixture
def frontend_base_url(pytestconfig) -> str:  # type: ignore
    """load command line option"""
    return pytestconfig.getoption("frontendBaseUrl")


@pytest.fixture
def backend_base_url(pytestconfig) -> str:  # type: ignore
    """load command line option"""
    return pytestconfig.getoption("backendBaseUrl")


@pytest.fixture(autouse=True, scope="session")
def global_browser_name(pytestconfig) -> None:  # type: ignore
    """load command line option"""
    name = pytestconfig.getoption("browser")
    pytest.browser_name = name


@pytest.fixture(autouse=True, scope="session")
def global_results_folder(pytestconfig) -> None:  # type: ignore
    """load command line option"""
    folder = pytestconfig.getoption("resultsFolder")
    Path(folder).mkdir(parents=True, exist_ok=True)
    (Path(folder) / "screenshots").mkdir(parents=True, exist_ok=True)
    pytest.results_folder = folder


@pytest.fixture
def skip_tour(
    backend_base_url: str,
) -> Generator[None, None, None]:
    """skip the spotlight tour by setting didRun in localforage"""
    requests.put(
        f"{backend_base_url}/api/config/walkthrough.main_tour.did_run",
        json={"value": True},
        timeout=1,
    )
    requests.put(
        f"{backend_base_url}/api/config/walkthrough.filebrowser_tour.did_run",
        json={"value": True},
        timeout=1,
    )
    yield
    requests.put(
        f"{backend_base_url}/api/config/walkthrough.main_tour.did_run",
        json={"value": False},
        timeout=1,
    )
    requests.put(
        f"{backend_base_url}/api/config/walkthrough.filebrowser_tour.did_run",
        json={"value": False},
        timeout=1,
    )


results_bag_store = {}


@pytest.fixture(
    scope="session",
)
def results_bag() -> Dict[str, Any]:
    """a dict to store serializable test results"""
    results_bag_store["version"] = spotlight_version()
    return results_bag_store


def spotlight_version() -> str:
    """get Spotlight version"""
    return (
        subprocess.check_output(
            ["poetry", "version", "-s"],
            stderr=subprocess.DEVNULL,
        )
        .decode("ascii")
        .strip()
    )


@pytest.fixture(scope="session", autouse=True)
def store_results_bag(
    results_bag: Dict[str, Any],
    pytestconfig: Any,
) -> Generator:
    """Store test results"""
    yield
    snapshot_folder = Path(pytestconfig.getoption("resultsFolder")) / "screenshots"
    snapshot_folder.mkdir(parents=True, exist_ok=True)
    with open(
        snapshot_folder
        / f"{pytestconfig.getoption('browser')}_timings_{results_bag['version']}.json",
        "w+",
        encoding="utf-8",
    ) as json_file:
        json.dump(results_bag, json_file)


@pytest.fixture(scope="function")
def webdriver(pytestconfig) -> WebDriver:  # type: ignore
    """configure browser"""
    browser = pytestconfig.getoption("browser")
    if browser == "firefox":
        ff_options = wd.FirefoxOptions()
        if pytestconfig.getoption("headless"):
            ff_options.add_argument("--headless")
        ff_options.add_argument("-height 720")
        ff_options.add_argument("-width 1280")
        ffox = wd.Firefox(options=ff_options)
        yield ffox
        ffox.quit()
        return

    chrome_options = wd.ChromeOptions()
    if pytestconfig.getoption("headless"):
        chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1280,720")
    chrome_options.add_argument("--window-size=1280,720")

    # enable browser logging
    capabilities = DesiredCapabilities.CHROME
    capabilities["loggingPrefs"] = {"browser": "ALL"}  # type: ignore

    chrome = wd.Chrome(options=chrome_options, desired_capabilities=capabilities)
    chrome.set_page_load_timeout(20)
    yield chrome
    chrome.quit()


@pytest.fixture()
def loaded_image_example_dataset(pytestconfig) -> None:  # type: ignore
    """replace the loaded dataset with the given dataset"""
    requests.post(
        pytestconfig.getoption("frontendBaseUrl")
        + "/api/table/open/build/datasets/tallymarks_dataset_small.h5",
        timeout=5,
    )


@pytest.fixture
def default_performance_dataset(pytestconfig) -> None:  # type: ignore
    """replace the loaded dataset with the given dataset"""
    requests.post(
        pytestconfig.getoption("frontendBaseUrl")
        + "/api/table/open/build/datasets/default.h5",
        timeout=5,
    )


@pytest.fixture
def many_cols_performance_dataset(pytestconfig) -> None:  # type: ignore
    """replace the loaded dataset with the given dataset"""
    requests.post(
        pytestconfig.getoption("frontendBaseUrl")
        + "/api/table/open/build/datasets/many_cols.h5",
        timeout=5,
    )


@pytest.fixture
def large_embeddings_performance_dataset(pytestconfig) -> None:  # type: ignore
    """replace the loaded dataset with the given dataset"""
    requests.post(
        pytestconfig.getoption("frontendBaseUrl")
        + "/api/table/open/build/datasets/large_embeddings.h5",
        timeout=5,
    )


@pytest.fixture
def many_cols_large_embeddings_performance_dataset(pytestconfig) -> None:  # type: ignore
    """replace the loaded dataset with the given dataset"""
    requests.post(
        pytestconfig.getoption("frontendBaseUrl")
        + "/api/table/open/build/datasets/many_cols_large_embeddings.h5",
        timeout=5,
    )


@pytest.fixture
def tallymarks_dataset(pytestconfig) -> None:  # type: ignore
    """replace the loaded dataset with the given dataset"""
    requests.post(
        pytestconfig.getoption("frontendBaseUrl")
        + "/api/table/open/build/datasets/tallymarks_dataset_small.h5",
        timeout=5,
    )
