const express = require('express')
const categoryController = require('../Controllers/category')
const route = express.Router()

route.get('/', categoryController.getCategories)

module.exports = route