const request = require('supertest');
const app = require('../app');

describe('Login Controller', () => {
  it('should respond with status code 200 and return token and user object', async () => {
    const userData = {
        email: 'solomia@gmail.com',
      password: '123456',
      };
       const response = await request(app)
      .post('/api/auth/login')
      .send(userData)
      .expect(200);

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('email', expect.any(String));
    expect(response.body.user).toHaveProperty('subscription', expect.any(String));
  });

});