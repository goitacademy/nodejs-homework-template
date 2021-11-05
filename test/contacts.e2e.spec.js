const request = require('supertest');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const db = require('../config/db');
const app = require('../app');

const Contact = require('../model/contact');
const User = require('../model/user');

const { HttpCode } = require('../config/constants');
const { newContact, newUserForRouteContact } = require('./data/data');

describe('Test route contacts', () => {
  let user, token;

  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newUserForRouteContact.email });
    user = await User.create(newUserForRouteContact);
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const issueToken = (payload, secret) => jwt.sign(payload, secret);
    token = issueToken({ id: user._id }, SECRET_KEY);
    await User.updateOne({ _id: user._id }, { token });
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUserForRouteContact.email });
    await mongo.disconnect();
  });

  beforeEach(async () => {
    await Contact.deleteMany({});
  });

  describe('GET request', () => {
    it('should return status 200 when got all contacts', async () => {
      const response = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(HttpCode.OK);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('status');
      expect(response.body.data.contacts).toBeInstanceOf(Array);
    });

    it('should return status 200 when got contact by Id', async () => {
      const contact = await Contact.create({ ...newContact, owner: user._id });
      const response = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(HttpCode.OK);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('status');
      expect(response.body.data.contact).toHaveProperty('id');
      expect(response.body.data.contact).toHaveProperty('name');
      expect(response.body.data.contact).toHaveProperty('email');
      expect(response.body.data.contact).toHaveProperty('phone');
      expect(response.body.data.contact).toHaveProperty('favorite');
    });

    it('should return status 404 if contact not found', async () => {
      const contact = await Contact.create({ ...newContact, owner: user._id });
      const response = await request(app)
        .get(`/api/contacts/${user._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(HttpCode.NOT_FOUND);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('code');
    });
  });

  describe('POST request', () => {
    it('should return status 201 when contqact created', async () => {
      const response = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send(newContact)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(HttpCode.CREATED);
      expect(response.body).toBeDefined();
    });
  });
});
