// const express = require('express');
const request = require('supertest');
// const login = require('./login');
// const usersRouter = require('../../routes/api/users')
const app = require('../../app')

/*
1. ответ должен иметь статус-код 200
2. в ответе должен возвращаться токен
3. в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String
*/

// const app = express();

// app.use('/api/users', login)

let testServer;
beforeAll(() => {
    testServer = app.listen(3000)
})

afterAll((done) => {
    testServer.close(done)
})

describe("test login function", ()=>{
    test("login has status 200", async()=>{
        const userData = {
                email: "mark@gmail.com",
                password: "12345"
            };
        const response = await request(app).post("/api/users/login").send(userData);
        expect(response.status).toBe(200);
    })
})