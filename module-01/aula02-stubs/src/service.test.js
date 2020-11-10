const assert = require('assert');
const sinon = require('sinon');
const Service = require('./service');
const mocks = {
    tatooine: require('../mocks/tatooine.json'),
    alderaan: require('../mocks/alderaan.json'),
};

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';

;(async () => {
    const service = new Service();
    const stub = sinon.stub(service, service.makeRequest.name);
    stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
    stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);
    {
        const expected = {
            name: 'Tatooine',
            surfaceWater: '1',
            appearenceCount: 5,
        };
        const results = await service.getPlanets(BASE_URL_1);
        assert.deepStrictEqual(results, expected);
    }
    {
        const expected = {
            name: 'Alderaan',
            surfaceWater: '40',
            appearenceCount: 2,
        };
        const results = await service.getPlanets(BASE_URL_2);
        assert.deepStrictEqual(results, expected);
    }
})();
