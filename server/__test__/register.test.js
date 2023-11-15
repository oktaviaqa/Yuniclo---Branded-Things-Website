const { sequelize } = require('../models')
const request = require('supertest');
const app = require('../app');
const bcrypt = require ('bcrypt');
const { login } = require('../Controllers/user');

beforeAll(async () => {
    try {
        await sequelize.queryInterface.bulkInsert(
            "Customers", [ {
                username: "user1",
                email: "user1@example.com",
                password: bcrypt.hashSync('user123', 10),
                phoneNumber: "2346798",
                address: "fsdbfjsnfk",
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

describe('POST /pub/register', () => {
    it('should create a user and return status 201', async () => {
        const body = {
            username: 'user',
            email: 'user@mail.com',
            password: 'user123',
            phoneNumber: "2346798",
            address: "fsdbfjsnfk",
        }
        const response = await request(app).post('/pub/register').send(body);
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('id', expect.any(Number))
        expect(response.body).toHaveProperty('email', expect.any(String))
    })

    it('should fail and return status 400 because it sends body without email', async () => {
        const body = {
            username: 'user',
            password: 'user123',
            phoneNumber: "2346798",
            address: "fsdbfjsnfk",
        }
        const response = await request(app).post('/pub/register').send(body);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email is required");
        
    })

    it('should fail and return status 400 because it sends body without password', async () => {
        const body = {
            username: 'user',
            email: 'user@mail.com',
            phoneNumber: "2346798",
            address: "fsdbfjsnfk",
        }
        const response = await request(app).post('/pub/register').send(body);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Password is required");
        
    })

    it('should fail and return status 400 because it sends email with empty string', async () => {
        const body = {
            username: 'user',
            email: '',
            password: 'user123',
            phoneNumber: "2346798",
            address: "fsdbfjsnfk",
        }
        const response = await request(app).post('/pub/register').send(body);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email is required");
        
    })

    it('should fail and return status 400 because it sends password with empty string', async () => {
        const body = {
            username: 'user',
            email: 'user@mail.com',
            password: '',
            phoneNumber: "2346798",
            address: "fsdbfjsnfk",
        }
        const response = await request(app).post('/pub/register').send(body);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Password is required");
    })
    
    it('should fail and return status 400 because it sends email with invalid format', async () => {
        const body = {
            username: 'user',
            email: 'user',
            password: 'user123',
            phoneNumber: "2346798",
            address: "fsdbfjsnfk",
        }
        const response = await request(app).post('/pub/register').send(body);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Please use the correct email format: user@example.com");
    })
    // it('should fail and return status 400 because email is already registered', async () => {
    //     const body = {
    //         username: 'user',
    //         email: 'user1@example.com',
    //         password: 'user123',
    //         phoneNumber: "2346798",
    //         address: "fsdbfjsnfk",
    //     }
    //     const response = await request(app).post('/pub/register').send(body);
    //     console.log(response.body);
    //     // expect(response.status).toBe(400);
        
    // })
    
})