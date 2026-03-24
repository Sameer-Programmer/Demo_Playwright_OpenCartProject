import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly emailAddressInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly forgottenPasswordLink: Locator;
    private readonly continueButton: Locator;
    private readonly registerLink: Locator;
    private readonly myAccountLink: Locator;
    private readonly loginLink: Locator;
    private readonly logoutLink: Locator;
    private readonly warningMessage:Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailAddressInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.locator('input[type="submit"][value="Login"]');
        this.forgottenPasswordLink = page.locator('a:has-text("Forgotten Password")');
        this.continueButton = page.locator('a:has-text("Continue")');
        this.registerLink = page.locator('a[href*="route=account/register"]');
        this.myAccountLink = page.locator('span[normalize-space()="My Account"]');
        this.loginLink = page.locator('a:has-text("Login")');
        this.logoutLink = page.locator('a:has-text("Logout")');
        this.warningMessage = page.getByText('Warning: No match for E-Mail Address and/or Password.', { exact: true })
    }

    async enterEmailAddress(email: string): Promise<void> {
        await this.emailAddressInput.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async clickForgottenPasswordLink(): Promise<void> {
        await this.forgottenPasswordLink.click();
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    async clickRegisterLink(): Promise<void> {
        await this.registerLink.click();
    }

    async clickMyAccountLink(): Promise<void> {
        await this.myAccountLink.click();
    }

    async clickLoginLink(): Promise<void> {
        await this.loginLink.click();
    }

    async clickLogoutLink(): Promise<void> {
        await this.logoutLink.click();
    }

    async loginOperation(email: string, password: string): Promise<void> {
        await this.enterEmailAddress(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async getEmailAddressValue(): Promise<string> {
        return await this.emailAddressInput.inputValue();
    }

    async getPasswordValue(): Promise<string> {
        return await this.passwordInput.inputValue();
    }

    async isLoginButtonVisible(): Promise<boolean> {
        return await this.loginButton.isVisible();
    }

    async isEmailAddressInputVisible(): Promise<boolean> {
        return await this.emailAddressInput.isVisible();
    }

    async isPasswordInputVisible(): Promise<boolean> {
        return await this.passwordInput.isVisible();
    }

    async navigateTo(): Promise<void> {
        await this.page.goto('https://tutorialsninja.com/demo/index.php?route=account/login');
    }

    async warningMessageVisible(): Promise<boolean> {
        return await this.warningMessage.isVisible();
    }

    async warningMessageHidden(): Promise<boolean> {
        return await this.warningMessage.isHidden();
    }   
}