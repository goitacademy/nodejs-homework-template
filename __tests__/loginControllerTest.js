const express = require("express");
const request = require("supertest");
const mongoose = require('mongoose');
require('dotenv').config();
const { ctrlLogin } = require('../src/controllers/authController');

const app = express();
mongoose.set('strictQuery', false);

app.post('/api/users/login', ctrlLogin);

describe('Test login controller', () => {
    beforeAll(async () => {
        app.listen(3000);
        mongoose.connect(process.env.DB_HOST);
        console.log('Server running with port 3000');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('Login return status 201', async () => {
        try {
            const user = { email: "user@gmail.com", password: "123456" };
            const response = await request(app)
                .post('/api/users/login')
                .send(user)
            
            console.log(response.status);
            expect(response.statusCode).toBe(201);
        } catch (error) {
            console.log(error);
        }   
    });
});