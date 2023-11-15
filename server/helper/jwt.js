const jwt = require('jsonwebtoken')
const secret = process.env.secret_key

function verifyToken(access_token){
    return jwt.verify(access_token, secret)
}

function createToken(payload) {
    return jwt.sign(payload, secret)
}

module.exports = {verifyToken, createToken}