const { where } = require('sequelize')
const { Product, User, Category, History } = require ('../models')

class ProductController {
    static async postProducts(req, res, next){
        const { name, description, price, stock, imgUrl, categoryId } = req.body
        try {
            const products = await Product.create({
                name, description, price, stock, imgUrl, categoryId, authorId:req.user.id
            })
            await History.create({
                "name": products.name,
                "description": `Products with ${products.id} created`,
                "updatedBy": req.user.email
            })
            res.status(201).json({message: "Products has been created"})
        } catch (error) { 
            next(error)
        }
    }

    static async getProducts(req, res, next){
        try {
            const products = await Product.findAll({
                include: [User, Category]
            })
            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }

    static async getDetailsProduct(req, res, next){
        const id = +req.params.id
        try {
            const detailProducts = await Product.findByPk(id)
            if (!detailProducts) {
                throw {name: 'not found'}
            } else {
                res.status(200).json(detailProducts)
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next){
        const id = +req.params.id
        try {
            const deleteProducts = await Product.destroy({
                where: {id}
            })
            if (!deleteProducts) {
                throw {name: 'not found'}

            } else {
                res.status(200).json({message: 'Product success to delete'})
            }
        } catch (error) {
            next(error)
        }
    }

    static async updateProduct(req, res, next){
        try {
            const id = req.params.id
            const { name, description, price, stock, imgUrl, categoryId } = req.body
            const updateProduct = await Product.update(
                {  name, description, price, stock, imgUrl, categoryId }, {
                    where: {id}, returning: true
                })
            await History.create({
                "name": req.body.name,
                "description": `Products with id ${id} updated`,
                "updatedBy": req.user.email
            })
            res.status(200).json({message: "Product has been updated"})
        } catch (error) {
            next(error)
        }
    }

    static async patchProduct(req, res, next){
        try {
            const id = req.params.id
            const status = req.body.status
            const findProduct = await Product.findByPk(id)
            if (!findProduct) {
                throw { name: "not found"}
            } else {
                let update;
                if (status === "Active") {
                    update = await Product.update(
                        { status: "Active"}, { where: {id}, returning: true})
                } else if (status === "Inactive") {
                    update = await Product.update(
                        { status: "Inactive"}, {where: {id}, returning: true})
                } else if (status === "Archived") {
                    update = await Product.update(
                        { status: "Archived"}, {where: {id}, returning: true})
                }
            }
            await History.create({
                "name": findProduct.name,
                "description": `Products with id ${id} status has been updated from ${findProduct.status} into ${status}`,
                "updatedBy": req.user.email
            })
            res.status(200).json({message: "Status has been updated"})
        } catch (error) {
            next(error)
        }
    }

    static async history(req, res, next){
        try {
            const showHistory = await History.findAll({
                order: [
                    ['id', 'DESC']
                ]
            })
            res.status(200).json(showHistory)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ProductController