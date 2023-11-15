const express = require('express')
const ProductController = require('../Controllers/product')
const router = express.Router()
const authorization = require ('../middlewares/authorization')
const userController = require('../Controllers/user')

router.post('/', ProductController.postProducts)
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getDetailsProduct)
router.delete('/:id', authorization, ProductController.deleteProduct)
router.put('/:id', authorization, ProductController.updateProduct)
router.patch('/:id', authorization, ProductController.patchProduct)


module.exports = router