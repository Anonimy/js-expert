const path = require('path');
const { writeFile } = require('fs/promises');
const faker = require('faker');
const Car = require('../src/entities/car');
const CarCategory = require('../src/entities/carCategory');
const Customer = require('../src/entities/customer');

const seederBaseFolder = path.join(__dirname, '..', 'database');
const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
    id: faker.random.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100),
});

const cars = [];
const customers = [];
for (let i = 0; i <= ITEMS_AMOUNT; i++) {
    const car = new Car({
        id: faker.random.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear(),
    });
    carCategory.carIds.push(car.id);
    cars.push(car);

    customers.push(new Customer({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        age: faker.random.number({ min: 18, max: 50 }),
    }));
}

const write = (fileName, data) => writeFile(path.join(seederBaseFolder, fileName), JSON.stringify(data));

;(async () => {
    await write('cars.json', cars);
    await write('customers.json', customers);
    await write('carCategories.json', [carCategory]);

    console.log('cars', cars);
    console.log('customers', customers);
    console.log('carCategories', carCategory);
})();
