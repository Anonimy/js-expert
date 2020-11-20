const http = require('http');
const path = require('path');
const CustomerService = require('./service/customer');
const CarCategoryService = require('./service/carCategory');
const CarService = require('./service/car');

const PORT = process.env.PORT || 3000;
const customersDatabase = path.join(__dirname, '..', 'database', 'customers.json');
const carCategoriesDatabase = path.join(__dirname, '..', 'database', 'carCategories.json');
const carsDatabase = path.join(__dirname, '..', 'database', 'cars.json');

const routes = {
    '/customers:get': async (req, res) => {
        const customerService = new CustomerService({ customers: customersDatabase });
        const id = req.query.get('id');
        const customers = await customerService.find(id);
        res.write(JSON.stringify(customers));
        res.end();
        return;
    },

    '/car/categories:get': async (req, res) => {
        const carCategoryService = new CarCategoryService({ carCategories: carCategoriesDatabase });
        const id = req.query.get('id');
        const carCategories = await carCategoryService.find(id);
        res.write(JSON.stringify(carCategories));
        res.end();
        return;
    },

    '/car/rent:post': async (req, res) => {
        for await (const data of req) {
            const rentData = JSON.parse(data);
            if (rentData.customer && rentData.carCategory && rentData.numberOfDays > 0) {
                const customerService = new CustomerService({ customers: customersDatabase });
                const carCategoryService = new CarCategoryService({ carCategories: carCategoriesDatabase });
                const [customer, carCategory] = await Promise.all([
                    customerService.find(rentData.customer),
                    carCategoryService.find(rentData.carCategory)
                ]);
                const carService = new CarService({ cars: carsDatabase });
                const transaction = await carService.rent(customer, carCategory, rentData.numberOfDays);
                res.write(JSON.stringify(transaction));
                res.end();
                return;
            }
        }
        res.writeHead(400);
        res.end();
        return;
    },

    default: (_, res) => {
        res.write('"Hello, world"');
        res.end();
        return;
    },
};

const handler = (req, res) => {
    const { method } = req;
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const routeKey = `${pathname}:${method.toLowerCase()}`;
    const chosen = routes[routeKey] || routes.default;
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    req.query = searchParams;
    chosen(req, res);
    return;
};

const app = http
    .createServer(handler)
    .listen(PORT, () => console.log('Listening on port', PORT));

module.exports = app;
