const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const dbContacts = require('../config/dbContacts');
const app = require('../app');
const Contacts = require('../model/schemaContact');
const User = require('../model/schemaUser');
const { newContact, newUser } = require('./data/data');
const { HttpCode } = require('../config/constants');

describe('Test router contact', () => {
  let user, token;

  beforeAll(async () => {
    await dbContacts;
    await User.deleteOne({ email: newUser.email });
    user = await User.create(newUser);
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const issueToken = (payload, select) => jwt.sign(payload, select);
    token = issueToken({ id: user._id }, SECRET_KEY);
    await User.updateOne({ _id: user._id }, { token });
  });

  afterAll(async () => {
    const mongo = await dbContacts;
    await User.deleteOne({ email: newUser.email });
    await mongo.disconnect();
  });

  beforeEach(async () => {
    await Contacts.deleteMany({});
  });

  describe('GET request', () => {
    it('should return status 200 get all contacts', async () => {
      const response = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(HttpCode.OK);
      expect(response.body).toBeDefined();
      expect(response.body.data.contacts).toBeInstanceOf(Array);
    });

    it('should return status 200 get by id contact', async () => {
      const contact = await Contacts.create({
        ...newContact,
        owner: user._id,
      });
      const response = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(HttpCode.OK);
      expect(response.body).toBeDefined();
      expect(response.body.data.contact).toBeDefined();
      expect(response.body.data.contact).toHaveProperty('id');
      expect(response.body.data.contact).toHaveProperty('name');
      expect(response.body.data.contact).toHaveProperty('phone');
      expect(response.body.data.contact).toHaveProperty('email');
    });

    it('should return status 404 if contact not found', async () => {
      const contact = await Contacts.create({
        ...newContact,
        owner: user._id,
      });
      const response = await request(app)
        .get(`/api/contacts/${user._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(HttpCode.BAD_REQUEST);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('code');
    });
  });

  describe('POST request', () => {
    it('should return status 201 create contact', async () => {
      const response = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send(newContact)
        .set('Accept', 'application/json');
      expect(response.status).toEqual(HttpCode.CREATED);
      expect(response.body).toBeDefined();
    });
  });

  describe('PUT request', () => {
    it('should return status 200 change  contact', async () => {
      const contact = await Contacts.create({ ...newContact, owner: user._id });
      const response = await request(app)
        .put(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ favorite: true })
        .set('Accept', 'application/json');
      expect(response.status).toEqual(HttpCode.OK);
      expect(response.body).toBeDefined();
    });
  });

  describe('PATCH request', () => {
    it('should return status 200 update contact', async () => {
      const contact = await Contacts.create({
        ...newContact,
        owner: user._id,
      });
      const response = await request(app)
        .patch(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Vitaliy Yakovlev' })
        .set('Accept', 'application/json');
      expect(response.status).toEqual(HttpCode.OK);
      expect(response.body).toBeDefined();
    });
  });

  describe('DELETE request', () => {
    it('should return status 200 change  contact', async () => {
      const contact = await Contacts.create({
        ...newContact,
        owner: user._id,
      });
      const response = await request(app)
        .delete(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json');
      expect(response.status).toEqual(HttpCode.OK);
      expect(response.body).toBeDefined();
    });
  });
});
