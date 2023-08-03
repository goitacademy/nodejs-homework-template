// відповідь повина мати статус-код 200
// у відповіді повинен повертатися токен
// у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";
import app from "../../app.js";
import login from "./login.js";

const { DB_HOST, PORT } = process.env;


describe("Login test", () => {
    let server;

    beforeAll( async () => {
        await mongoose.connect(DB_HOST)
            .then(() => (server = app.listen(PORT)))
            .catch((error) => {
                console.log(error.message);
                process.exit(1);
            });
    });

    afterAll( async() => {
        await mongoose.disconnect(DB_HOST)
            .then(() => {
                server.close();
            });
    });

    test("Response with status '200' returns token and user object with 'email' and  'subscription' fields with String type data",
        async () => {
            const response = await request(app)
                .post("/api/users/login", login)
                .send({
                    email: "nataliia2@gmail.com",
                    password: "123456",
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toMatchObject({
                user: {
                    email: expect.any(String),
                    subscription: expect.any(String),
                },
            });
        }
    );
});
