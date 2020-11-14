const path = require('path');
const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const CarService = require('../../src/service/car');
const { sandbox } = require('sinon');
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

    it('should return an available car', async () => {
        const car = mocks.validCar;
        const carCategory = Object.create(mocks.validCarCategory);
        carCategory.carIds = [car.id];
        sandbox.stub(carService.carsRepository, carService.carsRepository.find.name).returns(car);
        sandbox.spy(carService, carService.chooseRandomCar.name);
        const result = await carService.getAvailableCar(carCategory);
        const expected = car;
        expect(carService.chooseRandomCar.calledOnce).to.be.true;
        expect(carService.carsRepository.find.calledWithExactly(car.id)).to.be.true;
        expect(result).to.be.deep.equal(expected);
    });
});
