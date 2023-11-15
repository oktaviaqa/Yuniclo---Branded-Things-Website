const express = require('express')
const router = express.Router()

const productRoutes = require('./product')
const categoryRoutes = require('./category')
const publicRoutes = require('./public')

const authentication = require ('../middlewares/authentication')

const userController = require('../Controllers/user')
const ProductController = require('../Controllers/product')

router.post('/google-login', userController.googleLogin)
router.post('/register', userController.register)
router.post('/login', userController.login)

router.use('/pub', publicRoutes)

router.use(authentication);

router.use('/categories', categoryRoutes)
router.get('/users', userController.user)
router.use('/products', productRoutes)
router.get('/histories', ProductController.history)

module.exports = router