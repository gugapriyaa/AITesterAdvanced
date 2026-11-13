package com.salesforce.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class HomePage {

    private final WebDriver driver;
    private final WebDriverWait wait;

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    }

    public boolean isHomePageDisplayed() {
        try {
            wait.until(ExpectedConditions.or(
                    ExpectedConditions.urlContains("lightning.force.com"),
                    ExpectedConditions.urlContains(".my.salesforce.com"),
                    ExpectedConditions.urlContains("/home/home.jsp"),
                    ExpectedConditions.not(ExpectedConditions.urlContains("login.salesforce.com")),
                    ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[contains(@class,'userProfile') or contains(@class,'profile-card') or contains(@class,'globalHeader')]")))
            );
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
