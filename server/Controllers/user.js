const { User } = require('../models')
const bcrypt = require ('bcrypt')
const { createToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const env = process.env.client_ID

class userController {
    static async register(req, res, next){
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const admin = await User.create({
                username, email, password, role: "admin", phoneNumber, address
            })
            res.status(201).json({
                id: admin.id, 
                email: admin.email
            }
            )
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password} = req.body
            const user = await User.findOne({
                where: {email}
            })
            if (!user) {
                throw { name: "Invalid password or username" }
            } else {
                const checkPassword = bcrypt.compareSync(password, user.password)
                if (checkPassword) {
                    const payload = {id: user.id, email: user.email}
                    const access_token = createToken(payload) 
                    
                    res.status(200).json({access_token: access_token})
                } else {
                    throw { name: "Invalid password or username"}
                }
            }
        } catch (error) {
            next (error)
        }
    }

    static async googleLogin(req, res, next){
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience:  process.env.client_ID
            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: '8765434',
                    role: 'staff',
                    address: payload.locale
                },
                hooks: false
            })
            let access_token = createToken({
                id: user.id,
                email: user.email
            })
            res.status(200).json({access_token})
    } catch (error) {
        next(error)
    }
    }

    static async user (req, res, next){
        try {
            console.log('halo');
            const user = await User.findOne({
                where: {email: req.user.email}
            })
            res.status(200).json({user: user.username})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = userController