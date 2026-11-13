from playwright.sync_api import Page


class HomePage:
    def __init__(self, page: Page):
        self.page = page
        self.dashboard_header = page.locator("xpath=//h6[normalize-space()='Dashboard']")

    def is_dashboard_displayed(self) -> bool:
        try:
            self.dashboard_header.wait_for(state="visible", timeout=15000)
            return True
        except Exception:
            return False
