const path = require('path');
const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
const CarCategoryService = require('../../src/service/carCategory');
const { expect } = require('chai');
const mocks = {
    validCarCategory: require('../mocks/valid-carCategory.json'),
};

const carCategoriesDatabase = path.join(__dirname, '..', '..', 'database', 'carCategories.json');

describe('CarCategoryService suite cases', () => {
    let carCategoryService = null;
    let sandbox = null;

    before(() => {
        carCategoryService = new CarCategoryService({ carCategories: carCategoriesDatabase });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should retrieve a list of car categories', async () => {
        const carCategories = [mocks.validCarCategory];
        sandbox.stub(carCategoryService.carCategoriesRepository, carCategoryService.carCategoriesRepository.find.name).returns(carCategories);
        const result = await carCategoryService.find();
        expect(result).to.be.deep.equal(carCategories);
    });

    it('should filter by ID if a parameter is passed', async () => {
        sandbox.stub(carCategoryService.carCategoriesRepository, carCategoryService.carCategoriesRepository.find.name).returns(mocks.validCarCategory);
        const result = await carCategoryService.find(mocks.validCarCategory.id);
        expect(result).to.be.deep.equal(mocks.validCarCategory);
    })
});
