const { sequelize } = require('../models')
const request = require('supertest');
const app = require('../app');
const bcrypt = require ('bcrypt');
const { login } = require('../Controllers/user');

beforeAll(async () => {
    try {
        await sequelize.queryInterface.bulkInsert(
            "Customers", [ {
                email: "user1@example.com",
                password: bcrypt.hashSync('user123', 10),
            }
            ]
        )
    } catch (error) {
        console.log(error);
    }
})
afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("Customers", "null", {
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
})

describe('POST /sub/login', () => {
    it('should login is successful when return status 201 and return access token', async () => {
        try {
            const body = {
                email: 'user1@example.com',
                password: 'user123',
            }
            const response = await request(app).post('/sub/login').send(body);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('access_token', expect.any(String))
        } catch (error) {
            console.log(error);
        }
    })
    it('should fail and return status 400 because it sends invalid password', async () => {
        try {
            const body = {
                email: 'user1@example.com',
                password: 'wrongpassword',
            }
            const response = await request(app).post('/sub/login').send(body);
            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Invalid email or password");
        } catch (error) {
            console.log(error);
        }
    })
    it('should fail and return status 400 because it sends invalid email', async () => {
        try {
            const body = {
                email: 'wrongemail@example.com',
                password: 'user123',
            }
            const response = await request(app).post('/sub/login').send(body);
            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Invalid email or password");
        } catch (error) {
            console.log(error);
        }
    })
})