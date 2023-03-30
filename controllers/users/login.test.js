const app = require('../../app');
const request = require('supertest');

describe('login test', () => {
  it('returns status code 200, if login was seccessful', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: '1111@ukr.net', password: '1111' });

    expect(res.statusCode).toEqual(200);
  });

  //   it('returns bad request', async () => {
  //     const res = await request(app)
  //       .post('/login')
  //       .send({ email: '1111@ukr.net', password: '1111' });

  //     expect(res.statusCode).toEqual(200);
  //   });
});
