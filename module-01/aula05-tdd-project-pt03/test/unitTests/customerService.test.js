const path = require('path');
const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
const CustomerService = require('../../src/service/customer');
const { expect } = require('chai');
const mocks = {
    validCustomer: require('../mocks/valid-customer.json'),
};

const customersDatabase = path.join(__dirname, '..', '..', 'database', 'customers.json');

describe('CustomerService suite cases', () => {
    let customerService = null;
    let sandbox = null;

    before(() => {
        customerService = new CustomerService({ customers: customersDatabase });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should retrieve a list of customers', async () => {
        const customers = [mocks.validCustomer];
        sandbox.stub(customerService.customersRepository, customerService.customersRepository.find.name).returns(customers);
        const result = await customerService.find();
        expect(result).to.be.deep.equal(customers);
    });

    it('should filter by ID if a parameter is passed', async () => {
        sandbox.stub(customerService.customersRepository, customerService.customersRepository.find.name).returns(mocks.validCustomer);
        const result = await customerService.find(mocks.validCustomer.id);
        expect(result).to.be.deep.equal(mocks.validCustomer);
    })
});
