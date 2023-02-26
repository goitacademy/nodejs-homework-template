const mongoose = require('mongoose');
require('dotenv').config();

const { signup } = require('../controllers/users');
const { connectToContactsDB } = require('../services');

const {
  describe,
  expect,
  test,
  beforeEach,
  afterEach,
} = require('@jest/globals');

describe('Test for "signup" function', function () {
  const testedUserCred = {
    email: 'test@email.com',
    password: '121334faseq',
  };
  let UserModel = null;
  const req = { body: testedUserCred };
  const res = {
    statusValue: null,
    data: null,
    status: function (val) {
      this.statusValue = val;

      return this;
    },
    json: function (data) {
      this.data = data;
    },
  };

  beforeEach(async () => {
    await connectToContactsDB();
    UserModel = require('../models/users.js').UserModel;
  });

  afterEach(async () => {
    res.data = null;
    res.statusValue = null;
    await UserModel.findOneAndRemove({ email: testedUserCred.email });
    await mongoose.connection.close();
  });

  test('Status is 201', async () => {
    await signup(req, res, () => {});
    expect(res.statusValue).toBe(201);
  }, 10000);

  test('Response has token with null', async () => {
    await signup(req, res, () => {});
    expect(res.data.user.token).toBeNull();
  }, 10000);

  test('Response has "user" object', async () => {
    await signup(req, res, () => {});
    expect(res.data.user).toBeTruthy();
  }, 10000);

  test('Response has "user" object with "email" field', async () => {
    await signup(req, res, () => {});
    expect(res.data.user).toHaveProperty('email');
  }, 10000);

  test('Response has "user" object with "subscription" field', async () => {
    await signup(req, res, () => {});
    expect(res.data.user).toHaveProperty('subscription');
  }, 10000);
});
