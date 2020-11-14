const path = require('path');
const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const CarService = require('../../src/service/car');
const Transation = require('../../src/entities/transaction');
const Transaction = require('../../src/entities/transaction');
const mocks = {
    validCarCategory: require('../mocks/valid-carCategory.json'),
    validCar: require('../mocks/valid-car.json'),
    validCustomer: require('../mocks/valid-customer.json'),
};

const carsDatabase = path.join(__dirname, '..', '..', 'database', 'cars.json');

describe('CarService suite tests', () => {
    let carService = null;
    let sandbox = null;

    before(() => {
        carService = new CarService({ cars: carsDatabase });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should retrieve a random position from an array', () => {
        const data = [0, 1, 2, 3, 4];
        const result = carService.getRandomPositionFromArray(data);
        expect(result).to.be.lessThan(data.length).and.to.be.gte(0);
    });

    it('should choose the first id from carIds', () => {
        const carCategory = mocks.validCarCategory;
        const carIdIndex = 0;
        sandbox.stub(carService, carService.getRandomPositionFromArray.name).returns(carIdIndex);
        const result = carService.chooseRandomCar(carCategory);
        const expected = carCategory.carIds[carIdIndex];
        expect(carService.getRandomPositionFromArray.calledOnce).to.be.true;
        expect(result).to.be.equal(expected);
    });

    it('given a carCategory, it should return an available car', async () => {
        const car = mocks.validCar;
        const carCategory = { ...mocks.validCarCategory, carIds: [car.id] };
        sandbox.stub(carService.carsRepository, carService.carsRepository.find.name).returns(car);
        sandbox.spy(carService, carService.chooseRandomCar.name);
        const result = await carService.getAvailableCar(carCategory);
        const expected = car;
        expect(carService.chooseRandomCar.calledOnce).to.be.true;
        expect(carService.carsRepository.find.calledWithExactly(car.id)).to.be.true;
        expect(result).to.be.deep.equal(expected);
    });

    it('given a carCategory, a customer and the numberOfDays, it should calculate the final amount in Real', () => {
        const customer = { ...mocks.validCustomer, age: 50 };
        const carCategory = { ...mocks.validCarCategory, price: 37.6 };
        const numberOfDays = 5;
        // para não depender de "dados externos"
        sandbox.stub(carService, 'taxesBasedOnAge').get(() => [{ from: 50, to: 50, then: 1.3 }]);
        // category price * tax (defined by age) * days
        // 37.6 * 1.3 = 48.88 * 5 days = 244.40
        const expected = carService.currencyFormat.format(244.4);
        const result = carService.calculateFinalPrice(customer, carCategory, numberOfDays);
        expect(result).to.be.equal(expected);
    });

    it('given a customer and a car category, it should return a transaction receipt', async () => {
        const car = mocks.validCar;
        const carCategory = { ...mocks.validCarCategory, price: 37.6, carIds: [car.id] };
        const customer = { ...mocks.validCustomer, age: 20 };
        const numberOfDays = 5;
        const dueDate = '10 de novembro de 2020';
        const now = new Date(2020, 10, 5);
        sandbox.useFakeTimers(now.getTime());
        sandbox.stub(carService.carsRepository, carService.carsRepository.find.name).resolves(car);
        const expectedAmount = carService.currencyFormat.format(206.8);
        const result = await carService.rent(customer, carCategory, numberOfDays);
        const expected = new Transaction({
            customer,
            car,
            dueDate,
            amount: expectedAmount,
        });
        expect(result).to.be.deep.equal(expected);
    });
});
