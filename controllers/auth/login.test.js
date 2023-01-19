const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();

const app = require('../../app');
// const { User } = require('../../models/user');

const { DB_HOST, PORT } = process.env;

describe('test login controller', () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll((done) => {
    mongoose.disconnect(done);
    console.log('database disconnection');
    server.close()
  });

  beforeEach(done => {
    mongoose.connect(DB_HOST).then(() => done());
    console.log('database connection');
  });

  // afterEach(done => {
  //   mongoose.connection.db.dropCollection(() => {
  //     mongoose.connection.close(() => done());
  //   });
  // });

  test('test login controller', async () => {
    // const newUser = {
    //   email: 'serhiy@gmail.com',
    //   password: '123456',
    // };

    // const user = await User.create(newUser);

    const loginUser = {
      email: 'serhiy@gmail.com',
      password: '123456',
    };
        
    const response = await request(app).post('/api/auth/login').send(loginUser);
    console.log(response.statusCode);
    
      expect(response.statusCode).toBe(200);
      const { body } = response;
    console.log(body);
    const { user } = body;
    console.log(user);
    expect(body.token).toBeTruthy();
    expect(typeof body.token).toBe('string');
    expect(typeof user).toBe('object');
    expect(typeof user.email).toBe('string');
    expect(typeof user.subscription).toBe('string');
  });
});
