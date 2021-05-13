const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const {User, contacts, newContact} = require('../model/__mocks__/data');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({id: User.id}, JWT_SECRET_KEY)
User.token = token;

jest.mock('../model/users.js')
jest.mock('../model/contacts.js')

describe('Testing the routs api/contacts', () => {
    let idNewContact = null
    describe('Should handle GET request', () => {
        test('should return status 200  for GET: /contacts', async (done) => {
            const res = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contacts.contacts).toBeInstanceOf(Array)
            done()
        })
        test('should return status 200  for GET: /contacts/:id', async (done) => {
            const contact = contacts[0];
            const res = await request(app)
                .get(`/api/contacts/${contact._id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contact._id).toBe(contact._id)
            done()
        })
        test('should return status 404  for GET: /contacts/:id', async (done) => {
            const res = await request(app)
                .get(`/api/contacts/609187daacbf42393ded8888`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(404)
            expect(res.body).toBeDefined()
            done()
        })
        test('should return status 400  for GET: /contacts/:id', async (done) => {
            const res = await request(app)
                .get(`/api/contacts/6091873drd4875`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
    })
    describe('Should handle POST request', () => {
        test('should return status 201 for POST: /contacts', async (done) => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send(newContact)
            expect(res.status).toEqual(201)
            expect(res.body).toBeDefined()
            idNewContact = res.body.data.contact._id
            done()
        })

        test('should return status 400 for POST: /contacts wrong field', async (done) => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({...newContact, test: 1})
            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
        test('should return status 400 for POST: /contacts without field', async (done) => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({phone: '1111111'})
            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
    })
    describe('Should handle PUT request', () => {
        test('should return status 200 for PUT: /contacts:/id', async (done) => {
            const res = await request(app)
                .put(`/api/contacts/${idNewContact}`)
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({name:'newContactName'})
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contact.name).toBe('newContactName')
            done()
        })
        test('should return status 400 for PUT: /contacts/:id wrong field', async (done) => {
            const res = await request(app)
                .put(`/api/contacts/${newContact._id}`)
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({ test: 1})
            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
        test('should return status 404 for PUT: /contact/:id ', async (done) => {
            const res = await request(app)
                .put('/api/609187daacbf42393ded8888')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({phone: '1111111'})
            expect(res.status).toEqual(404)
            expect(res.body).toBeDefined()
            done()
        })
    })
    describe('Should handle PATCH request', () => {
        test('should return status 200 for PATCH: /contacts:/id/favorite', async (done) => {
            const res = await request(app)
                .patch(`/api/contacts/${idNewContact}/favorite`)
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({isFavorite:true})
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contact.isFavorite).toBe(true)
            done()
        })
        test('should return status 400 for PATCH: /contacts/:id wrong field', async (done) => {
            const res = await request(app)
                .patch(`/api/contacts/${newContact._id}/favorite`)
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({ test: 1})
            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
        test('should return status 404 for PATCH: /contact/:id Not Found', async (done) => {
            const res = await request(app)
                .patch('/api/609187daacbf42393ded8888')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({phone: '1111111'})
            expect(res.status).toEqual(404)
            expect(res.body).toBeDefined()
            done()
        })
    })
})