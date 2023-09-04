const request = require('supertest');
const login = require('../controllers/auth/login');
const app = require('../server');

test('Test login', async () => {
    const email = 'emblelele@gmail.com';
    const password = "emblelele";
    const response = await request(app)
        .post('/api/users/login')
        .send({ email, password });
        console.log(response)
    expect(response.status).toBe(200);
})