import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly telephoneInput: Locator;
    readonly passwordInput: Locator;
    readonly passwordConfirmInput: Locator;
    readonly subscribeYesRadio: Locator;
    readonly subscribeNoRadio: Locator;
    readonly privacyPolicyCheckbox: Locator;
    readonly continueButton: Locator;
    readonly loginLink: Locator;
    readonly privacyPolicyLink: Locator;
    readonly msgConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('#input-firstname');
        this.lastNameInput = page.locator('#input-lastname');
        this.emailInput = page.locator('#input-email');
        this.telephoneInput = page.locator('#input-telephone');
        this.passwordInput = page.locator('#input-password');
        this.passwordConfirmInput = page.locator('#input-confirm');
        this.subscribeYesRadio = page.locator('input[name="newsletter"][value="1"]');
        this.subscribeNoRadio = page.locator('input[name="newsletter"][value="0"]');
        this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
        this.continueButton = page.locator('input[type="submit"][value="Continue"]');
        this.loginLink = page.locator('a:has-text("login page")');
        this.privacyPolicyLink = page.locator('a:has-text("Privacy Policy")');
        this.msgConfirmation = page.locator('h1:has-text("Your Account Has Been Created!")');
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async enterTelephone(telephone: string): Promise<void> {
        await this.telephoneInput.fill(telephone);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async enterPasswordConfirm(passwordConfirm: string): Promise<void> {
        await this.passwordConfirmInput.fill(passwordConfirm);
    }

    async selectSubscribeYes(): Promise<void> {
        await this.subscribeYesRadio.check();
    }

    async selectSubscribeNo(): Promise<void> {
        await this.subscribeNoRadio.check();
    }

    async checkPrivacyPolicy(): Promise<void> {
        await this.privacyPolicyCheckbox.check();
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async clickLoginLink(): Promise<void> {
        await this.loginLink.click();
    }

    async clickPrivacyPolicyLink(): Promise<void> {
        await this.privacyPolicyLink.click();
    }

    async isFirstNameDisplayed(): Promise<boolean> {
        return await this.firstNameInput.isVisible();
    }

    async getFirstNameValue(): Promise<string> {
        return await this.firstNameInput.inputValue();
    }

    async register(
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
        subscribe: boolean = false
    ): Promise<void> {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterTelephone(telephone);
        await this.enterPassword(password);
        await this.enterPasswordConfirm(password);

        if (subscribe) {
            await this.selectSubscribeYes();
        } else {
            await this.selectSubscribeNo();
        }

        await this.checkPrivacyPolicy();
        await this.clickContinue();
    }
}