const register = require("./register");

const express = require("express");

const request = require("supertest");

const app = express();

app.post("/api/users/signup", register);

describe("test register controllers", () => {
    beforeAll(() => app.listen(3000));
    afterAll(() => app.close());


    test("register array of user", async () => {
        const response = await request(app).post("/api/users/signup");
        console.log(response.status);
    })
})