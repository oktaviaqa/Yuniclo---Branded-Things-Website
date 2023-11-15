if (process.env.NODE_ENV !== "production") {
    // cuma dipakai ditahap development testing
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const routers = require('./routers')
const errorHandler = require('./middlewares/errorHandlers')


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/', routers)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`REST API listening on ${port}`);
})

module.exports = app