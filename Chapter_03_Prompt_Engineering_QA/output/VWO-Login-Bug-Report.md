# Bug Report

> **Hypothetical training example.** This is not a confirmed issue in VWO.

## 1. Title
Login with a registered email and an empty password submits the form and shows a generic credential error instead of a mandatory-password validation message.

## 2. Environment
- Application: https://app.vwo.com/
- Browser / version: Not supplied
- Operating system: Not supplied
- Build: Not supplied
- Execution time: Not supplied

## 3. Preconditions
- The user is logged out.
- A registered test email is available.
- The login page is displayed.

## 4. Test Data
- Email: `<registered_email>`
- Password: empty

## 5. Steps to Reproduce
1. Open https://app.vwo.com/.
2. In the email field, enter `<registered_email>`.
3. Leave the password field empty.
4. Click **Sign in**.

## 6. Expected Result
Based on the requirement "Email and password are mandatory," the empty password should be rejected before submission, with visible validation feedback on the password field.

## 7. Actual Result
The form submits and displays the banner message:

> "Your email, password, IP address or location did not match"

The password field shows no specific required-field feedback.

## 8. Reproducibility
3 out of 3 attempts.

## 9. Suggested Severity and Rationale
**Provisional: Medium.**

Rationale: Functionality is not blocked for valid logins, but the mandatory-password requirement is not enforced with precise feedback. This degrades usability and may mislead users into thinking their credentials, location, or IP address are wrong.

## 10. Attachments
- Screenshot: Not provided
- Video: Not provided
- Logs: Not provided
