const express = require('express')
const router = express.Router()
const authCustomer = require('../middlewares/authCustomer')
const customerController = require('../Controllers/customer')


router.post('/google-login', customerController.googleLogin)
router.post('/register', customerController.register)
router.post('/login', customerController.login)
router.get('/customers', customerController.customer)
router.get('/products', customerController.getProducts)
router.get('/categories', customerController.getCategories)
router.get('/products/:id', customerController.detailProducts)
router.post('/generate-qr', customerController.generateQRCode)

router.use(authCustomer);
router.post('/favorites/:id', customerController.addFavorite)
router.get('/favorites', customerController.getFavorite )
router.delete('/favorites/:id', customerController.deleteFavorite)



module.exports = router