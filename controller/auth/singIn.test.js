const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

require("dotenv").config();
const { DB_HOST } = process.env;

describe("test signUp controller", () => {
    let server;
    beforeAll(() => {
        mongoose
            .connect(DB_HOST)
            .then(() => {
                server = app.listen(3001, () => {});
            })
            .catch(() => {
                process.exit(1);
            });
    });
    afterAll((done) => {
        mongoose.disconnect(done);
        server.close();
    });

    test("signin with valid body, return token and users object", async () => {
        const {
            status,
            body: {
                data: { token, user },
            },
        } = await request(app)
            .post("/api/auth/signin")
            .set("Content-type", "application/json")
            .send({
                email: "test@gmail.com",
                password: "123456",
            });

        expect(status).toBe(200);
        expect(typeof token).toBe("string");
        expect(typeof user).toBe("object");
        expect(typeof user.name).toBe("string");
        expect(typeof user.email).toBe("string");
        expect(typeof user.subscription).toBe("string");
    });

    test("signin with invalid email", async () => {
        const {
            status,
            body: { message },
        } = await request(app)
            .post("/api/auth/signin")
            .set("Content-type", "application/json")
            .send({
                email: "testgmail.com",
                password: "123456",
            });

        expect(status).toBe(400);
        expect(message).toBe("Please fill a valid email address");
    });

    test("signin with incorrect email", async () => {
        const {
            status,
            body: { message },
        } = await request(app)
            .post("/api/auth/signin")
            .set("Content-type", "application/json")
            .send({
                email: "test12345ts@gmail.com",
                password: "123456",
            });

        expect(status).toBe(401);
        expect(message).toBe("Email is wrong");
    });

    test("signin with invalid password", async () => {
        const {
            status,
            body: { message },
        } = await request(app)
            .post("/api/auth/signin")
            .set("Content-type", "application/json")
            .send({
                email: "test@gmail.com",
                password: "12345",
            });

        expect(status).toBe(400);
        expect(message).toBe('"password" length must be at least 6 characters long');
    });

    test("signin with incorrect password", async () => {
        const {
            status,
            body: { message },
        } = await request(app)
            .post("/api/auth/signin")
            .set("Content-type", "application/json")
            .send({
                email: "test@gmail.com",
                password: "1234567",
            });

        expect(status).toBe(401);
        expect(message).toBe("Password is wrong");
    });

    test("signin without body", async () => {
        const {
            status,
            body: { message },
        } = await request(app)
            .post("/api/auth/signin")
            .set("Content-type", "application/json")
            .send();

        expect(status).toBe(400);
        expect(message).toBe("missing fields");
    });

    test("signin without email", async () => {
        const {
            status,
            body: { message },
        } = await request(app)
            .post("/api/auth/signin")
            .set("Content-type", "application/json")
            .send({
                password: "1234567",
            });

        expect(status).toBe(400);
        expect(message).toBe('"email" is required');
    });

    test("signin without password", async () => {
        const {
            status,
            body: { message },
        } = await request(app)
            .post("/api/auth/signin")
            .set("Content-type", "application/json")
            .send({
                email: "test@gmail.com",
            });

        expect(status).toBe(400);
        expect(message).toBe('"password" is required');
    });
});
