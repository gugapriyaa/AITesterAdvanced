from playwright.sync_api import Page

from pages.login_page import LoginPage
from utils.config import BASE_URL


def test_invalid_login(browser_page: Page):
    login_page = LoginPage(browser_page)
    login_page.navigate(BASE_URL)
    login_page.do_login("invalid_user", "invalid_password")

    error_message = login_page.get_error_message()
    assert "Invalid credentials" in error_message, f"Expected invalid credentials error. Actual: {error_message}"
