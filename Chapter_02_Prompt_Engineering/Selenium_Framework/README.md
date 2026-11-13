# Salesforce Login Automation Framework

Enterprise-grade Selenium WebDriver + Java + TestNG + Allure framework that validates the Salesforce login page (`https://login.salesforce.com/?locale=in`).

## Stack
- Java 17 (Temurin)
- Maven 3.9
- Selenium WebDriver 4.27 (ChromeDriver auto-managed by Selenium Manager)
- TestNG 7.10
- Allure Report 2.29

## Structure
```
Selenium_Framework/
├── pom.xml
├── testng.xml
├── .env                              # VALID_USERNAME / VALID_PASSWORD
└── src/test/java/com/salesforce/
    ├── config/ConfigReader.java      # loads .env via dotenv-java
    ├── core/DriverFactory.java       # Chrome driver + waits
    ├── core/BaseTest.java            # TestNG @BeforeMethod/@AfterMethod
    ├── pages/LoginPage.java          # Page Object (xpath locators)
    ├── pages/HomePage.java           # post-login verification
    └── tests/
        ├── ValidLoginTest.java
        └── InvalidLoginTest.java
```

## Run (headed mode)
The framework runs Chrome in normal (headed) mode with `--start-maximized`.

```bat
set JAVA_HOME=<path-to-jdk-17>
set PATH=%JAVA_HOME%\bin;<path-to-maven>\bin;%PATH%
mvn clean test
```

Allure report:
```bat
mvn clean test
allure generate target/allure-results -o target/allure-report --clean
```

## Test cases
- `ValidLoginTest`: submits configured credentials and verifies either the home page loads or the standard Salesforce login error is shown.
- `InvalidLoginTest`: submits invalid credentials and asserts the Salesforce "check your username and password" error.

## Design rules followed
- XPath selectors only (no CSS/ID/name selectors).
- Explicit `WebDriverWait`; no `Thread.sleep`.
- TestNG annotations (`@Test`, `@BeforeMethod`, `@AfterMethod`).
- Page Object Model with reusable actions and structured exception handling.
- Allure result collection via the `allure-testng` listener.
