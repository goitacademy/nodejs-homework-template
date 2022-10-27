const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../app");
const { User } = require("../models/user");

const { DB_TEST_HOST, PORT } = process.env;

describe("test auth routes", () => {
    let server;
    beforeAll(() => (server = app.listen(PORT)));
    afterAll(() => server.close());

    beforeEach(() => {
        mongoose.connect(DB_TEST_HOST);
    });

    // afterEach((done) => {
    //     mongoose.connection.db.dropCollection(() => {
    //         mongoose.connection.close(() => done());
    //     });
    // }); .............................. это пока осталось загадкой :( , оно не работает

    afterEach(() => {
        mongoose.disconnect();
    });

    test("test login route", async () => {
        /*
        1. ответ должен иметь статус-код 200
        2. в ответе должен возвращаться токен
        3. в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String
        */

        const loginUser = {
            email: "oleg@gmail.com",
            password: "123456",
        };

        const response = await request(app)
            .post("/api/users/signin")
            .send(loginUser);
        expect(response.statusCode).toBe(200);
        const { body } = response;
        expect(body.token).toBeTruthy();
        expect(body.user).toEqual(
            expect.objectContaining({
                email: expect.any(String),
                subscription: expect.any(String),
            })
        );
    });
});
