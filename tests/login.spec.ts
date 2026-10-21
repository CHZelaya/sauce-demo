import { test, expect } from '@playwright/test';


test.describe('Log in Page Loads', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('Standard user logs in and is redirected to the inventory page', async ({ page }) => {
        const login = page.getByRole('button').getByText("Login")

        await page.getByRole('form').getByPlaceholder("Username").fill('standard_user')
        await page.getByRole('form').getByPlaceholder("Password").fill('secret_sauce')


        await login.click();

        //Expect to see Products page
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(page.getByText('Products')).toContainText('Products')
    })

});


[
    { name: 'blank username and password', username: '', password: '', expected: 'Username is required' },
    { name: 'locked out user', username: 'locked_out_user', password: 'secret_sauce', expected: 'this user has been locked out' },
    { name: 'blank username, filled password', username: '', password: 'secret_sauce', expected: 'Username is required' },
    { name: 'filled username, blank password', username: 'standard_user', password: '', expected: 'Password is required' },
    { name: 'correct username, wrong password', username: 'standard_user', password: 'not_so_secret_sauce', expected: 'do not match any user in this service' },
    { name: 'incorrect username, correct password', username: 'not_standard_user', password: 'secret_sauce', expected: 'do not match any user in this service' },
].forEach(({ name, username, password, expected }) => {
    test.describe('error messages', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/')
        });
        test(`${name}`, async ({ page }) => {
            const login = page.getByRole('button').getByText('Login')

            await page.getByRole('form').getByPlaceholder("Username").fill(`${username}`)
            await page.getByRole('form').getByPlaceholder('Password').fill(`${password}`)

            await login.click()
            await expect(page.getByRole('alert')).toBeVisible()
            await expect(page.getByRole('alert')).toContainText(`${expected}`)
            await expect(page).toHaveURL('/')
        })
    })
})
