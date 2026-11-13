from playwright.sync_api import Page


class LoginPage:
    def __init__(self, page: Page):
        self.page = page
        self.username_input = page.locator("xpath=//input[@name='username']")
        self.password_input = page.locator("xpath=//input[@name='password']")
        self.login_button = page.locator("xpath=//button[@type='submit']")
        self.error_message = page.locator("xpath=//*[contains(@class,'oxd-alert--error') or @role='alert']")

    def navigate(self, base_url: str):
        self.page.goto(base_url)

    def enter_username(self, username: str):
        self.username_input.fill(username)

    def enter_password(self, password: str):
        self.password_input.fill(password)

    def click_login(self):
        self.login_button.click()

    def do_login(self, username: str, password: str):
        self.enter_username(username)
        self.enter_password(password)
        self.click_login()

    def get_error_message(self) -> str:
        return self.error_message.inner_text().strip()
