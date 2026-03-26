import { Page, Locator } from '@playwright/test';





export class MyAccountPage {
    private readonly page: Page;
    private readonly myAccountHeading: Locator;
    private readonly editAccountLink: Locator;
    private readonly changePasswordLink: Locator;
    private readonly modifyAddressBookLink: Locator;
    private readonly modifyWishListLink: Locator;
    private readonly orderHistoryLink: Locator;
    readonly downloadsLink: Locator;
    readonly rewardPointsLink: Locator;
    readonly returnsLink: Locator;
    readonly transactionsLink: Locator;
    readonly newsletterLink: Locator;
    readonly recurringPaymentsLink: Locator;
    readonly logoutLink: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myAccountHeading = page.locator('//h2[text()="My Account"]');
        this.editAccountLink = page.locator('//a[text()="Edit your account information"]');
        this.changePasswordLink = page.locator('//a[text()="Change your password"]');
        this.modifyAddressBookLink = page.locator('//a[text()="Modify your address book entries"]');
        this.modifyWishListLink = page.locator('//a[text()="Modify your wish list"]');
        this.orderHistoryLink = page.locator('//a[text()="View your order history"]');
        this.downloadsLink = page.locator('//a[text()="Downloads"]');
        this.rewardPointsLink = page.locator('//a[text()="Your Reward Points"]');
        this.returnsLink = page.locator('//a[text()="View your return requests"]');
        this.transactionsLink = page.locator('//a[text()="Your Transactions"]');
        this.newsletterLink = page.locator('//a[text()="Subscribe / unsubscribe to newsletter"]');
        this.recurringPaymentsLink = page.locator('//a[text()="Recurring payments"]');
        this.logoutLink = page.locator('a').filter({ hasText: 'Logout' }).first()
        this.continueButton = page.locator('//a[text()="Continue"]');
    }

    async clickEditAccount(): Promise<void> {
        await this.editAccountLink.click();
    }

    async clickChangePassword(): Promise<void> {
        await this.changePasswordLink.click();
    }

    async clickModifyAddressBook(): Promise<void> {
        await this.modifyAddressBookLink.click();
    }

    async clickModifyWishList(): Promise<void> {
        await this.modifyWishListLink.click();
    }

    async clickOrderHistory(): Promise<void> {
        await this.orderHistoryLink.click();
    }

    async clickDownloads(): Promise<void> {
        await this.downloadsLink.click();
    }

    async clickRewardPoints(): Promise<void> {
        await this.rewardPointsLink.click();
    }

    async clickReturns(): Promise<void> {
        await this.returnsLink.click();
    }

    async clickTransactions(): Promise<void> {
        await this.transactionsLink.click();
    }

    async clickNewsletter(): Promise<void> {
        await this.newsletterLink.click();
    }

    async clickRecurringPayments(): Promise<void> {
        await this.recurringPaymentsLink.click();
    }

    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }


    //accountheadingvisible 
    async accountHeadingVisible(): Promise<boolean> {
        return await this.myAccountHeading.isVisible();
    }




}