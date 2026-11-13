package com.salesforce.tests;

import io.qameta.allure.Description;
import io.qameta.allure.Severity;
import io.qameta.allure.SeverityLevel;
import org.testng.Assert;
import org.testng.annotations.Test;

import com.salesforce.config.ConfigReader;
import com.salesforce.core.BaseTest;
import com.salesforce.pages.LoginPage;

public class ValidLoginTest extends BaseTest {

    @Test(priority = 1, description = "Valid Salesforce login should land on the home page")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Enter configured credentials and verify the user reaches the Salesforce home page")
    public void validLoginTest() {
        try {
            LoginPage loginPage = new LoginPage(driver);
            boolean homePageDisplayed = loginPage
                    .doLogin(ConfigReader.getValidUsername(), ConfigReader.getValidPassword())
                    .isHomePageDisplayed();
            Assert.assertTrue(homePageDisplayed, "Home page was not displayed after a valid login");
        } catch (AssertionError e) {
            throw e;
        } catch (Exception e) {
            Assert.fail("Valid login flow failed: " + e.getMessage(), e);
        }
    }
}
