const { describe, it, afterEach, beforeEach } = require('mocha');
const { expect } = require('chai');
const request = require('supertest');
const sinon = require('sinon');
const app = require('../../src/api');
const BaseRepository = require('../../src/repository/base/base');
const CarCategoryService = require('../../src/service/carCategory');
const CustomerService = require('../../src/service/customer');
const Transaction = require('../../src/entities/transaction');
const CarService = require('../../src/service/car');
const mocks = {
    validCarCategory: require('../mocks/valid-carCategory.json'),
    validCar: require('../mocks/valid-car.json'),
    validCustomer: require('../mocks/valid-customer.json'),
};

describe('API Suite tests', () => {
    let sandbox = null;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('GET /hello', () => {
        it('should request a nonexistent route /hello and return a default message "Hello, world"', async () => {
            const response = await request(app)
                .get('/hello')
                .expect(200);
            expect(response.body).to.be.equal('Hello, world');
        });
    })

    describe('GET /customers', () => {
        it('should return a list of customers', async () => {
            const customers = [mocks.validCustomer];
            sandbox.stub(BaseRepository.prototype, BaseRepository.prototype.find.name).resolves(customers);
            const response = await request(app)
                .get('/customers')
                .expect(200);
            expect(response.body).to.be.deep.equal(customers);
        });

        it('should filter by id when an "/:id" parameter is passed', async () => {
            const spy = sandbox.spy(CustomerService.prototype, CustomerService.prototype.find.name);
            const stub = sandbox.stub(BaseRepository.prototype, BaseRepository.prototype.find.name).resolves(mocks.validCustomer);
            const response = await request(app)
                .get(`/customers?id=${mocks.validCustomer.id}`)
                .expect(200);
            const expectedParams = Object.values({ itemId: mocks.validCustomer.id });
            const { args: argsServ } = spy.getCall(0);
            const { args: argsRepo } = stub.getCall(0);
            expect(argsServ).to.be.deep.equal(expectedParams);
            expect(argsRepo).to.be.deep.equal(expectedParams);
            expect(response.body).to.be.deep.equal(mocks.validCustomer);
        });
    });

    describe('GET /car/categories', () => {
        it('should return a list of car categories', async () => {
            const carCategories = [mocks.validCarCategory];
            sandbox.stub(BaseRepository.prototype, BaseRepository.prototype.find.name).resolves(carCategories);
            const response = await request(app)
                .get('/car/categories')
                .expect(200);
            expect(response.body).to.be.deep.equal(carCategories);
        });

        it('should filter by id when an "/:id" parameter is passed', async () => {
            const spy = sandbox.spy(CarCategoryService.prototype, CarCategoryService.prototype.find.name);
            const stub = sandbox.stub(BaseRepository.prototype, BaseRepository.prototype.find.name).resolves(mocks.validCarCategory);
            const response = await request(app)
                .get(`/car/categories?id=${mocks.validCarCategory.id}`)
                .expect(200);
            const expectedParams = Object.values({ itemId: mocks.validCarCategory.id });
            const { args: argsServ } = spy.getCall(0);
            const { args: argsRepo } = stub.getCall(0);
            expect(argsServ).to.be.deep.equal(expectedParams);
            expect(argsRepo).to.be.deep.equal(expectedParams);
            expect(response.body).to.be.deep.equal(mocks.validCarCategory);
        });
    });

    describe('POST /car/rent', () => {
        it ('should return a transaction receipt', async () => {
            const car = mocks.validCar;
            const carCategory = { ...mocks.validCarCategory, price: 37.6, carIds: [car.id] };
            const customer = { ...mocks.validCustomer, age: 20 };
            const numberOfDays = 5;
            const dueDate = '10 de novembro de 2020';
            const now = new Date(2020, 10, 5);
            sandbox.useFakeTimers(now.getTime());
            sandbox.stub(CustomerService.prototype, CustomerService.prototype.find.name).resolves(customer);
            sandbox.stub(CarCategoryService.prototype, CarCategoryService.prototype.find.name).resolves(carCategory);
            sandbox.stub(CarService.prototype, CarService.prototype.getAvailableCar.name).resolves(car);
            const expectedAmount = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(206.8);
            const response = await request(app)
                .post('/car/rent')
                .send({ customer: customer.id, carCategory: carCategory.id, numberOfDays })
                .expect(200);
            const expected = new Transaction({
                customer,
                car,
                dueDate,
                amount: expectedAmount,
            });
            expect(response.body).to.be.deep.equal(expected);
        });

        it('should return HTTP Status 400 if the client does not send a payload', async () => {
            await request(app)
                .post('/car/rent')
                .expect(400);
        });
    });
});
