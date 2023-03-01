require('dotenv').config();
const mongoose = require('mongoose');
const supertest = require("supertest");
const app = require('../app');
const { User } = require('../src/db/userModel');

const { DB_HOST_TEST } = process.env;

describe('Test login controller', () => {
    beforeAll(async () => {
        await mongoose.connect(DB_HOST_TEST);
        console.log('Test database connection successful');
    });

    afterAll(async () => {
        await User.deleteMany();
        await mongoose.disconnect();
    });

    test('should login a user', async () => {
        await supertest(app).post('/api/auth/users/signup').send({
            "email": "user@gmail.com",
            "password": "123456",
            "subscription": "pro"
        });

        const response = await supertest(app).post('/api/auth/users/login').send({
            "email": "user@gmail.com",
            "password": "123456",
            "subscription": "pro"
        })

        const { token, user } = response.body.data;

        expect(response.status).toEqual(201);
        expect(user).toBeDefined();
        expect(token).toBeDefined();
        expect(user.email).toEqual(expect.any(String));
        expect(user.subscription).toEqual(expect.any(String));
    });
});