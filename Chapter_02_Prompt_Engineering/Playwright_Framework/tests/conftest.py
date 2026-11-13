import pytest
from playwright.sync_api import sync_playwright


@pytest.fixture(scope="function")
def browser_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=False, args=["--start-maximized"])
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()
        yield page
        context.close()
        browser.close()
