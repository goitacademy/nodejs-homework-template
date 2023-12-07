const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

describe("test login", () => {
    beforeAll(async() => {
        await mongoose.connect(DB_HOST);
    });

    afterAll(async() => {
        await mongoose.disconnect(DB_HOST);
    });

    test("login", async() => {
        const response = await (
            await request(app).post("/api/auth/login")
        ).send({
            email: "avatar1010@gmail.com",
            password: "artur",
        });

        expect(response.statusCode).toBe(200);
        expect("token" in response.body).toBe(true);
        expect("user" in response.body).toBe(true);
        expect("email" in response.body.user).toBe(true);
        expect("subscription" in response.body.user).toBe(true);
        expect(typeof response.body.user.email).toBe("string");
        expect(typeof response.body.user.subscription).toBe("string");
    });
});