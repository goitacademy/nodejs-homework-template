const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, contacts } = require('../model/__mocks__/data');
const app = require('../app');

const SECRET_KEY = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

jest.mock('../model/contacts.js');
jest.mock('../model/users.js');

describe('Testing the route api/contacts', () => {
  describe('Should handle get request', () => {
    it('should return 200 on GET request All contacts', async done => {
      const res = await request(app)
        .get(`/api/contacts`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contacts).toBeInstanceOf(Array);
      done();
    });
    // it('should return 200 status by id', async done => {
    //   const contact = contact[0];
    //   const res = await request(app)
    //     .get(`/api/contacts/${contact._id}`)
    //     .set('Authorization', `Bearer ${token}`);
    //   console.log('STATUS>>>>>>>>', res.status);
    //   console.log('body>>>>>>>>', res.body);
    //   console.log('contacts>>>>>>>>', res.body.data.contacts);
    //   expect(res.status).toEqual(200);
    //   expect(res.body).toBeDefined();
    //   expect(res.body.data.contact).toHaveProperty('_id');
    //   expect(res.body.data.contact).toBe(contact._id);
    //   done();
    // });
  });

  describe('Should handle post request', () => {});
  describe('Should handle put request', () => {});
  describe('Should handle patch request', () => {});
  describe('Should handle delete request', () => {});
});
