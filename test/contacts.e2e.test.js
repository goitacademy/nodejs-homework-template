/* eslint-disable no-undef */
const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, contacts, newContact } = require('../model/__mocks__/data');
const app = require('../app');

const SECRET_KEY = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

jest.mock('../model/contacts.js');
jest.mock('../model/users.js');

describe('Testing the route api/contacts', () => {
  let idNewContact;

  describe('Testing get all contacts', () => {
    it('Get all contacts success should return 200 status', async done => {
      const res = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contacts).toBeInstanceOf(Array);
      done();
    });

    it('Unauthorized error should return 401 status', async done => {
      const res = await request(app)
        .get('/api/users/current')
        .set('Authorization', `Bearer ${123}`);
      expect(res.status).toEqual(401);
      done();
    });
  });

  describe('Testing get contact by ID', () => {
    it('Get contact by ID success should return 200 status', async done => {
      const contact = contacts[0];
      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact).toHaveProperty('_id');
      expect(res.body.data.contact._id).toBe(contact._id);
      done();
    });

    it('Contact not found should return 404 status', async done => {
      const wrongId = 12345;
      const res = await request(app)
        .get(`/api/contacts/${wrongId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(404);
      done();
    });

    it('Unauthorized error should return 401 status', async done => {
      const contact = contacts[0];
      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${123}`);
      expect(res.status).toEqual(401);
      done();
    });
  });

  describe('Testing create new contact', () => {
    it('Add contact success should return 201 status', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send(newContact)
        .set('Accept', 'application/json');

      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      idNewContact = res.body.data.contact._id;
      done();
    });

    it('Wrong field should return 400 status', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...newContact, test: 1 })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });

    it('Should return 400 status without required field name', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...newContact, test: 1 })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });

    it('Unauthorized error should return 401 status', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${123}`)
        .send(newContact)
        .set('Accept', 'application/json');

      expect(res.status).toEqual(401);
      expect(res.body).toBeDefined();
      done();
    });
  });

  describe('Testing update contact', () => {
    it('Update contact success should return 200 status', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Alla' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact.name).toBe('Alla');
      done();
    });

    it('Wrong field subscription should return 400 status', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ subscription: 'abc' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });

    it('Should return 404 status with wrong id', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${123}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Alla' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });

    it('Should return 400 status for empty request', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });

    it('Unauthorized error should return 401 status', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${123}`)
        .send({ name: 'Alla' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(401);
      expect(res.body).toBeDefined();
      done();
    });
  });

  describe('Testing remove contact', () => {
    it('Remove contact success should return 200 status', async done => {
      const res = await request(app)
        .delete(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      done();
    });

    it('Should return 404 status with wrong id', async done => {
      const res = await request(app)
        .delete(`/api/contacts/${123}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });

    it('Unauthorized error should return 401 status', async done => {
      const res = await request(app)
        .delete(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${123}`);

      expect(res.status).toEqual(401);
      expect(res.body).toBeDefined();
      done();
    });
  });
});