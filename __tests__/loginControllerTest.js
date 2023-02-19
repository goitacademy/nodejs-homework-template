const request = require("supertest");
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('../app');
const { login } = require('../src/services/authService');

mongoose.set('strictQuery', false);

describe('Test login controller', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.DB_HOST);
        console.log('Test database connection successful');
    });

    afterAll(async () => {
        await mongoose.disconnect(process.env.DB_HOST);
    });

    test('Login return status 201', async () => {
        try {
            const email = "user@gmail.com";
            const password = "123456";

            const data = await login(email, password);

            const response = await request(app)
                .post('/api/auth/users/login')
                .send(data)
                .set('Accept', 'application/json');
            
            const { status } = response;
            const { token, user } = response.data;

            expect(status).toBe(201);
            expect(token).toBeDefined();
            expect(user).toBeDefined();
        } catch (error) {
            console.log(error);
        }   
    });
});