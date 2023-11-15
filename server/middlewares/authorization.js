const { User, Product } = require('../models')

async function authorization(req, res, next){
    try {
        const {id} = req.params
        const findProduct = await Product.findByPk(id)
        if (!findProduct) {
            throw { name: "not found"}
        }
        if (req.user.role !== 'admin') {
            console.log(req.user);
            if (req.user.id !== findProduct.authorId) {
                throw { name: 'forbidden'}
            }
        }
        next ()
    } catch (error) {
        next (error)
    }
}

module.exports = authorization