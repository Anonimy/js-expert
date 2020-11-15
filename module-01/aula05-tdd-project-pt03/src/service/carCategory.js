const BaseRepository = require("../repository/base/base");

class CarCategoryService {
    constructor({ carCategories }) {
        this.carCategoriesRepository = new BaseRepository({ file: carCategories });
    }

    async find(itemId = null) {
        const categories = await this.carCategoriesRepository.find(itemId);
        return categories;
    }
}

module.exports = CarCategoryService;