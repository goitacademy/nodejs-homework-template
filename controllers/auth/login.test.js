const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const { DB_HOST, PORT = 3000 } = process.env;

describe("test login function", () => { 
    beforeAll(() => {
        mongoose.set('strictQuery', true); // т. як з наступної версії стане false
        mongoose.connect(DB_HOST) // підключення до БД 
        .then(() => {
            console.log('Database connection successful');
            app.listen(3000);
        })
        .catch(error => {
            console.log(error.message);
            process.exit(1); // закриваємо запущені процеси, 1 - означає невідому помилку
        });
      });


    test("status must be 200", async () => {
        const response = await supertest(app).post('/api/auth/login').send({ "email": "max@gmail.com", "password": "123456" }); 
        expect(response.status).toBe(200);
    });

    test("token must be a string", async () => {
        const response = await supertest(app).post('/api/auth/login').send({"email":"max@gmail.com", "password":"123456"}); 
        expect(typeof response.body.token).toBe("string");
    });

    test("email must be a string", async () => {
        const response = await supertest(app).post('/api/auth/login').send({"email":"max@gmail.com", "password":"123456"}); 
        expect(typeof response.body.user.email).toBe("string");
    });

    test("subscription must be a string", async () => {
        const response = await supertest(app).post('/api/auth/login').send({"email":"max@gmail.com", "password":"123456"}); 
        expect(typeof response.body.user.subscription).toBe("string");
    });
});