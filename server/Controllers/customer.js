const { Customer, Product, User, Category, Favorite } = require('../models')
const bcrypt = require('bcrypt')
const { createToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const env = process.env.client_ID;
const { Op } = require('sequelize');
const qrCodeGeneratorApiKey = process.env.QR_CODE_GENERATOR_API_KEY;
const axios = require('axios');
const { post } = require('../routers');

class customerController {
    static async register(req, res, next){
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const response = await Customer.create({
                username, email, password, phoneNumber, address
            })
            res.status(201).json({

                id: response.id,
                email: response.email
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req, res, next){
        try {
            const { email, password } = req.body
            const response = await Customer.findOne({
                where: { email }
            })
            if (!response) {
                throw { name: 'Invalid password or username'}
            } else {
                const checkPassword = bcrypt.compareSync(password, response.password)
                if (checkPassword) {
                    const payload = {id: response.id, email: response.email}
                    const access_token = createToken(payload)

                    res.status(200).json({ access_token: access_token })
                } else {
                    throw { name: 'Invalid password or username' }
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req, res, next){
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience:  process.env.client_ID
            });
            const payload = ticket.getPayload();
            const [customer, created] = await Customer.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: '8765434',
                    address: payload.locale
                },
                hooks: false
            })
            let access_token = createToken({
                id: customer.id,
                email: customer.email
            })
            res.status(200).json({access_token})
    } catch (error) {
        next(error)
    }
    }

    static async customer (req, res, next){
        try {
            const user = await Customer.findOne({
                where: {email: req.customer.email}
            })
            res.status(200).json({user: user.username})
        } catch (error) {
            next(error)
        }
    }

    static async getProducts(req, res, next){
        try {
            const { page = 1, filter, search } = req.query
            const limit = 8
            const offset = (page - 1) * limit
            let where = {}

            if (filter) {
                    where.categoryId = filter
            }

            if (search) {
                    where.name = {
                        [Op.iLike]: `%${search}%`
                    }
            }

            const response = await Product.findAll({
                include: [Category],
                order: [[ 'id', 'ASC']],
                offset: offset,
                limit: limit,
                where
            })
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async getCategories(req, res, next){
        try {
            const Categories = await Category.findAll({})
            res.status(200).json(Categories)
        } catch (error) {
            next(error)
        }
    }

    static async detailProducts(req, res, next){
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

    static async generateQRCode(req, res, next){
        try {
            const { url } = req.body
            console.log(req.body);
            const { data} = await axios ({
                url: `https://api.qr-code-generator.com/v1/create?access-token=${qrCodeGeneratorApiKey}`,
                method:'post',
                data: {
                    "frame_name": "no-frame",
                    "qr_code_text": `${url}`,
                    "image_format": "SVG",
                    "qr_code_logo": "scan-me-square"
                }
            })
            res.status(200).json({data})
        } catch (error) {
            next(error);
        }
    }

    static async addFavorite(req, res, next){
        try {
            const { id, email } = req.customer
            const productId = +req.params.id
            const checkFavorite = await Favorite.findOne({
                where: {
                    CustomerId: id,
                    ProductId: productId
                }
            });
            if (checkFavorite) {
                res.status(400).json({message: 'Product already in favorite'})
            } else {
                const fav = await Favorite.create({
                    "CustomerId": id,
                    "ProductId": productId
                })
                res.status(201).json({message: `Product has been added to Favorite`})
            }

        } catch (error) {
            next(error)
        }
    }

    static async getFavorite(req, res, next){
        try {
            const getFav = await Favorite.findAll({
                include : [Product, Customer],
                where:{ CustomerId: req.customer.id}
            })
            res.status(200).json(getFav)
        } catch (error) {
            next(error)
        }
    }

    static async deleteFavorite(req, res, next){
        try {
            const id = +req.params.id
            const del = await Favorite.destroy({
                where: {id}
            })
            res.status(200).json({message: 'Favorite has been deleted'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = customerController