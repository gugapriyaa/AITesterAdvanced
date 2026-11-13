package com.salesforce.config;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvException;

public class ConfigReader {

    private static final Dotenv dotenv = loadDotenv();

    private static Dotenv loadDotenv() {
        try {
            return Dotenv.configure().directory(System.getProperty("user.dir")).ignoreIfMissing().load();
        } catch (DotenvException e) {
            throw new IllegalStateException("Unable to load .env configuration", e);
        }
    }

    public static String getValidUsername() {
        return dotenv.get("VALID_USERNAME");
    }

    public static String getValidPassword() {
        return dotenv.get("VALID_PASSWORD");
    }

    public static String getBaseUrl() {
        return dotenv.get("BASE_URL", "https://login.salesforce.com/?locale=in");
    }
}
