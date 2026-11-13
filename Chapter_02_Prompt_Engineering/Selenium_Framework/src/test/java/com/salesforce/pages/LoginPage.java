package com.salesforce.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class LoginPage {

    private final WebDriver driver;
    private final WebDriverWait wait;

    private final By usernameLocator = By.xpath("//input[@id='username']");
    private final By passwordLocator = By.xpath("//input[@id='password']");
    private final By loginButtonLocator = By.xpath("//input[@id='Login']");
    private final By rememberMeLocator = By.xpath("//input[@id='rememberUn']");
    private final By errorLocator = By.xpath("//*[@id='error' or @role='alert']");
    private final By usernameLoginLink = By.xpath("//a[normalize-space()='Log In with Username']");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    }

    public LoginPage enterUsername(String user) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameLocator)).sendKeys(user);
        return this;
    }

    public LoginPage enterPassword(String pass) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(passwordLocator)).sendKeys(pass);
        return this;
    }

    public HomePage clickLogin() {
        wait.until(ExpectedConditions.elementToBeClickable(loginButtonLocator)).click();
        return new HomePage(driver);
    }

    public LoginPage submitUsername() {
        wait.until(ExpectedConditions.elementToBeClickable(loginButtonLocator)).click();
        return this;
    }

    public LoginPage clickRememberMe() {
        WebElement rememberMe = wait.until(ExpectedConditions.elementToBeClickable(rememberMeLocator));
        if (!rememberMe.isSelected()) {
            rememberMe.click();
        }
        return this;
    }

    public LoginPage switchToUsernameLogin() {
        if (isElementPresent(usernameLoginLink)) {
            wait.until(ExpectedConditions.elementToBeClickable(usernameLoginLink)).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(usernameLocator));
        }
        return this;
    }

    public HomePage doLogin(String user, String pass) {
        switchToUsernameLogin();
        enterUsername(user);
        submitUsername();
        enterPassword(pass);
        return clickLogin();
    }

    private boolean isElementPresent(By locator) {
        try {
            return wait.until(ExpectedConditions.presenceOfElementLocated(locator)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getErrorMessage() {
        WebElement error = wait.until(ExpectedConditions.visibilityOfElementLocated(errorLocator));
        return error.getText().trim();
    }
}
