const BaseRepository = require("../repository/base/base");

class CustomerService {
    constructor({ customers }) {
        this.customersRepository = new BaseRepository({ file: customers });
    }

    async find(itemId = null) {
        const customers = await this.customersRepository.find(itemId);
        return customers;
    }
}

module.exports = CustomerService;
