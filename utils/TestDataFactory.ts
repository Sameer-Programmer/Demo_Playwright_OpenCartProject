import { faker } from '@faker-js/faker';

export class TestDataFactory {

    static getRegistrationData() {

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
}