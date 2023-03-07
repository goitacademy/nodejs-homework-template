const request = require('supertest');
const express = require('express');
const cors = require('cors');
const logIn = require('../controllers/auth/logIn');
const signUp = require('../controllers/auth/signUp');

const app1 = express();
app1.use(cors());
app1.use(express.json());
app1.use(express.static('public'));
app1.post('/auth/login', logIn);
app1.post('/auth/signup', signUp);
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { User } = require('../models');
const {
  describe,
  expect,
  afterEach,
  it,
  beforeAll,
  afterAll,
} = require('@jest/globals');

let mongo = null;
let server1;
const email = 'emailemail2@gmail.com';
const password = 'Mypassword1';
const connectDB = async () => {
  mongo = await MongoMemoryServer.create({
    instance: { dbName: 'users' },
  });
  const uri = mongo.getUri();
  await mongoose.connect(uri, { dbName: 'users' }).then(() => {
    mongoose.Promise = global.Promise;
    server1 = app1.listen(3002);
  });
};
const dropDB = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
    await server1.close();
  }
};
const dropCollections = async () => {
  if (mongo) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.remove();
    }
  }
};
beforeAll(async () => {
  await connectDB();
  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.createDefaultAvatar();
  await newUser.save();
});
afterAll(async () => {
  await dropDB();
});
afterEach(async () => {
  await dropCollections();
});
describe('test logIn response', () => {
  it('should have success result with status 200', async () => {
    const result = await request(app1)
      .post('/auth/login')
      .send({ email, password });
    const resultBody = result.body;
    //check status
    expect(result.statusCode).toBe(200);
    //check is token came

    expect(resultBody).toHaveProperty('token');
    expect(resultBody).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          subscription: expect.any(String),
          email: expect.any(String),
        }),
        token: expect.any(String),
      })
    );
  });
  // describe('login should fail with 401', () => {
  //   it('should fail if email, or password not passed or passed wrong value', () => {
  //     // expect.assertions(1);
  //     expect(
  //       request(app1)
  //         .post('/auth/login')
  //         .send({ email: 'dkfjs@feef.com', password })
  //     ).toThrow(
  //       expect.objectContaining({
  //         message: expect.any(String),
  //         status: 401,
  //       })
  //     );
  //   });
  // });
});
