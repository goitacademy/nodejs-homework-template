const request = require('supertest');
const app = require('../server');
const User = require('../models/user');

const dummyUser = {
    email: "testt@gmail.com",
    password: 'test',
    subscription: "pro",
    avatarURL: null,
}

describe('Test login and register', () => {
    test('Test register', async () => {
        const response = await request(app)
            .post('/api/users/signup')
            .send(dummyUser);
        expect(response.status).toBe(201);
    })
    test('Test login', async () => {
        const { email, password } = dummyUser;
        const response = await request(app)
            .post('/api/users/login')
            .send({ email, password });
        if (response.status === 200) {
            const { email } = dummyUser;
            const { _id } = await User.findOne({ email });
            return await User.findByIdAndRemove(_id);
        }
        expect(response.status).toBe(200);
    });
});

