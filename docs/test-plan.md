# Sauce Demo Test Plan

**Application under test:** Swag Labs by Sauce Labs (https://www.saucedemo.com)
**Scope:** Login and access control. Other areas of the site are not covered in this repo.

---

## How I approach testing 

Questions I ask about each feature before writing any test.

### Inputs
- Empty, too long, wrong case, extra spaces, special characters
- Valid user, wrong password
- Wrong user, valid password

### Sequence and state
- Can I hit a URL without being logged in?
- What happens on back or refresh mid-flow?
- What happens if I repeat the same action twice?

---

## Test cases

### Login (`tests/login.spec.ts`)

| ID | Test case | Expected result |
|----|-----------|-----------------|
| TC-01 | Standard user logs in | Redirected to the inventory page |
| TC-02 | Blank username and password | "Username is required" error; stays on the login page |
| TC-03 | Blank username, filled password | "Username is required" error; stays on the login page |
| TC-04 | Filled username, blank password | "Password is required" error; stays on the login page |
| TC-05 | Correct username, wrong password | "Do not match any user" error; stays on the login page |
| TC-06 | Incorrect username, correct password | "Do not match any user" error; stays on the login page |
| TC-07 | Locked-out user | "This user has been locked out" error; stays on the login page |

### Access control (`tests/access-control.spec.ts`)

| ID | Test case | Expected result |
|----|-----------|-----------------|
| TC-08 | Logged-out user visits each protected page: `/inventory.html`, the three `dynamic-catalog-*` pages, `/cart.html`, `/checkout-step-one.html`, `/checkout-step-two.html`, `/checkout-complete.html` | Redirected to the login page with an error naming the page that needs a login |

---

## Manual findings

Found while exploring the cart and checkout by hand. These are not covered by automated tests, and this repo is complete as it stands. Expected behaviour was not confirmed against any requirements, so these are observations, not verified defects.

| ID | Area | Observation |
|----|------|-------------|
| F-01 | Checkout | An empty cart can be checked out, and the generated PDF shows a total of $0 |
| F-02 | Checkout | First name, last name and postal code accept a single character; no format validation was apparent |
| F-03 | Checkout | Special characters are accepted in the checkout fields |
| F-04 | Checkout | Code can be entered in the fields; it appeared to be displayed as literal text and not rendered as markup |
