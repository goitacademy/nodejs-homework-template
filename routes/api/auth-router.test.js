import mongoose from "mongoose";
import request from "supertest";

import app from '../../app.js';

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe('test /users', () => {
    let server = null;

    beforeAll(async () => {
        await mongoose.connect(DB_TEST_HOST);
        server = app.listen(PORT);
    });

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    });

    test("test /login with correctData", async () => {
        const correctData = { email: "email@test.com", password: "12345678" };
        const {
            statusCode,
            body: { token, user },
        } = await request(app).post("/users/login").send(correctData);

        expect(statusCode).toBe(200);
        expect(user).toEqual({
            email: expect.any(String),
            subscription: expect.any(String),
        });
        expect(token);
    });
});
