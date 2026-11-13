package com.salesforce.tests;

import io.qameta.allure.Description;
import io.qameta.allure.Severity;
import io.qameta.allure.SeverityLevel;
import org.testng.Assert;
import org.testng.annotations.Test;

import com.salesforce.core.BaseTest;
import com.salesforce.pages.LoginPage;

public class InvalidLoginTest extends BaseTest {

    @Test(priority = 1, description = "Invalid Salesforce credentials should display the login error")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Enter invalid credentials and verify the Salesforce login error is shown")
    public void invalidLoginTest() {
        try {
            LoginPage loginPage = new LoginPage(driver);
            loginPage.doLogin("invalid_user@example.com", "invalid_password");
            String errorMessage = loginPage.getErrorMessage();
            Assert.assertTrue(errorMessage.toLowerCase().contains("check your username and password"),
                    "Expected login error message was not displayed. Actual: " + errorMessage);
        } catch (AssertionError e) {
            throw e;
        } catch (Exception e) {
            Assert.fail("Invalid login flow failed: " + e.getMessage(), e);
        }
    }
}
