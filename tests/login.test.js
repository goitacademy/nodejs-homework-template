const login = require("../controllers/auth/login");
const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");

const path = require("path");

const envPath = path.join(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST);

function isToken(token) {
    const tokenRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
    return tokenRegex.test(token);
}

const app = express();
app.use(express.json());

app.post("/api/users/login", login);

describe("test register controller", () => {
    let server;
    beforeAll(() => server = app.listen(3000));
    afterAll(() => {
        server.close();
        mongoose.connection.close();
    }
    );

    test("answers with 200", async () => {
        const response = await request(app).post("/api/users/login").send({
            email: "example@gmail.com",
            password: "example"
        });
        expect(response.status).toBe(200);
    });

    test("returns token", async () => {
        const response = await request(app).post("/api/users/login").send({
            email: "example@gmail.com",
            password: "example"
        });
        const { token } = response.body.data;
        expect(typeof token).toBe("string");
        expect(isToken(token)).toBe(true);
    });

    test("returns uses with email and subscription", async () => {
        const response = await request(app).post("/api/users/login").send({
            email: "example@gmail.com",
            password: "example"
        });
        const { user } = response.body.data;
        expect(typeof user).toBe("object");
        expect(typeof user.email).toBe("string");
        expect(typeof user.subscription).toBe("string");
    });
});
