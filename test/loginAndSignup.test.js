const request = require('supertest');
const app = require('../server');
const User = require('../models/user');

describe('Test login and register', () => {
    test('Test login', async () => {
        const email = 'emblelele@gmail.com';
        const password = "emblelele";
        const response = await request(app)
            .post('/api/users/login')
            .send({ email, password });
        expect(response.status).toBe(200);
    });
    test('Test register', async () => {
        const email = 'test@test.pl';
        const password = "test";
        const subscription = "pro";
        const response = await request(app)
            .post('/api/users/signup')
            .send({ email, password, subscription });
        expect(response.status).toBe(201);
        const { _id } = await User.findOne({ email });
        await User.findByIdAndRemove(_id);
    })
});

