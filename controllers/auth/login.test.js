const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const {DB_HOST, PORT = 3000} = process.env
mongoose.set('strictQuery', true);
const login = require("./login");

let server;

describe("test login controller", () => {
    beforeAll(()=> {
        mongoose.connect(DB_HOST)
.then(() => {
  server = app.listen(PORT)
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
})
    });

    afterAll(async () => await server.close());

    test("response has a status 200", async() => {
        const response = await request(app).post('/api/auth/login', login).send({
            email:'mattis.Cras@nonenimMauris.net',
            password: '123456',
        });
        expect(response.status).toBe(200);
    });

    test("response return token", async() => {
        const response = await request(app).post('/api/auth/login', login).send({
            email:'mattis.Cras@nonenimMauris.net',
            password: '123456',
        });
        expect(response.body).toHaveProperty('token');
    });

    test("response return a user object with 2 fields email and subscription with the String data type", async() => {
        const response = await request(app).post('/api/auth/login', login).send({
            email:'mattis.Cras@nonenimMauris.net',
            password: '123456',
        });
        const user = response.body;
        expect(typeof user).toBe('object');
        expect(typeof user.email).toBe('string');
        expect(typeof user.name).toBe('string');
    })
})