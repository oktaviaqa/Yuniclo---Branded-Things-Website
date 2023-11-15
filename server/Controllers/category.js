const { Product, Category, User} = require ('../models')
class categoryController {
    static async getCategories(req, res, next){
        try {
            const Categories = await Category.findAll({})
            res.status(200).json(Categories)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = categoryController