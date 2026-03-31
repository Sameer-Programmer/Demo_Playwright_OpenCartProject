import { faker } from '@faker-js/faker';

export class TestDataFactory {

    getRegistrationData() {

        const firstName: string = faker.person.firstName();
        const lastName: string = faker.person.lastName();
        const email: string = `user${Date.now()}@test.com`;
        const telephone: string = faker.string.numeric(10);
        const password: string = faker.internet.password({ length: 10 });

        return {
            firstName,
            lastName,
            email,
            telephone,
            password
        };
    }

    static getProductData() {
        return {
            productName: "iPhone",
            quantity: "2",
            totalPrice: "$246.40"
        };
    }

    // ================== PRODUCT TEST DATA FOR SEARCH TESTS ==================
    /**
     * Get iPhone product data
     */
    static getIPhoneData() {
        return {
            name: "iPhone",
            price: "$123.20",
            model: "product 11"
        };
    }

    /**
     * Get MacBook product data
     */
    static getMacBookData() {
        return {
            name: "MacBook",
            price: "$602.00",
            model: "MA464LL/A"
        };
    }

    /**
     * Get Apple Cinema 30" product data
     */
    static getAppleCinemaData() {
        return {
            name: "Apple Cinema 30\"",
            price: "$122.00",
            model: "product 42"
        };
    }

    /**
     * Get Canon EOS 5D product data
     */
    static getCanonEosData() {
        return {
            name: "Canon EOS 5D",
            price: "$122.00",
            model: "product 30"
        };
    }

    /**
     * Get multiple products for multi-product tests
     * @param count - Number of products to return (default: 2)
     */
    static getMultipleProducts(count: number = 2) {
        const allProducts = [
            this.getIPhoneData(),
            this.getMacBookData(),
            this.getAppleCinemaData(),
            this.getCanonEosData()
        ];
        return allProducts.slice(0, count);
    }

    /**
     * Get all available test products
     */
    static getAllProducts() {
        return {
            iPhone: this.getIPhoneData(),
            MacBook: this.getMacBookData(),
            AppleCinema: this.getAppleCinemaData(),
            CanonEOS: this.getCanonEosData()
        };
    }

    /**
     * Get random product from available products
     */
    static getRandomProduct() {
        const allProducts = [
            this.getIPhoneData(),
            this.getMacBookData(),
            this.getAppleCinemaData(),
            this.getCanonEosData()
        ];
        return allProducts[Math.floor(Math.random() * allProducts.length)];
    }
}