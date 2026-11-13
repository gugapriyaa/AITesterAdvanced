from playwright.sync_api import Page

from pages.login_page import LoginPage
from pages.home_page import HomePage
from utils.config import BASE_URL, VALID_USERNAME, VALID_PASSWORD


def test_successful_login(browser_page: Page):
    login_page = LoginPage(browser_page)
    login_page.navigate(BASE_URL)
    login_page.do_login(VALID_USERNAME, VALID_PASSWORD)

    home_page = HomePage(browser_page)
    assert home_page.is_dashboard_displayed(), "Dashboard was not displayed after a successful login"
