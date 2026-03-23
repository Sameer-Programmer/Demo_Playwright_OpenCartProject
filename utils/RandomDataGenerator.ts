import { faker } from "@faker-js/faker"

export class RandomDataUtil {

    static getRandomFirstname() {
        return faker.person.firstName();
    }

    static getRandomLastname() {
        return faker.person.lastName();
    }

    static getRandomEmail() {
        return faker.internet.email();
    }

    static getRandomTelephone() {
        return faker.phone.number();
    }

    static getRandomAddress() {
        return faker.location.streetAddress()
    }

    static getRandomCity() {
        return faker.location.city()
    }

    static getRandomState() {
        return faker.location.state()
    }

    static getRandomZipCode() {
        return faker.location.zipCode()
    }

    static getRandomCountry() {
        return faker.location.country()
    }

    static getRandomCompanyName() {
        return faker.company.name()
    }

    static getRandomJobTitle() {
        return faker.person.jobTitle()
    }

    static getRandomJobDescriptor() {
        return faker.person.jobDescriptor()
    }

    static getRandomJobType() {
        return faker.person.jobType()
    }

    static getRandomJobArea() {
        return faker.person.jobArea()
    }
}   