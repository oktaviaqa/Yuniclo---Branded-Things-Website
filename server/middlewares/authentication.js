const { User, Customer } = require('../models')
const {verifyToken }= require('../helper/jwt.js')

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw { name: 'unauthenticated'}
        }
        const decode = verifyToken(access_token)
        const findUser = await User.findByPk(decode.id)
        if (!findUser) {
            throw { name: 'unauthenticated'}
        }
        req.user = {
            id: decode.id,
            email: decode.email,
            role: findUser.role
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication