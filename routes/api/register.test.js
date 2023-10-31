import mongoose from "mongoose";
import app from "../../app.js";
import "dotenv/config";
import request from "supertest";
//import { User } from "../../models/user.js";
const { TEST_DB_HOST } = process.env;

describe("test register route", () => {
    let server = null;
    beforeAll(async () => {
        await mongoose.connect(TEST_DB_HOST);
        server = app.listen(3000);
    });
    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    });
    afterEach(async () => {
        await User.deleteMany({});
    });
    test("test register with correct data", async () => {
        const loginData = {
            name: "Maryna",
            email: "Maryna@mail.com",
            password: "123456",
        };
        const { statusCode, body } = await request(app)
            .post("/api/auth/register")
            .send(loginData);
        expect(statusCode).toBe(201);
        expect(body.name).toBe(loginData.name);
        expect(body.email).toBe(loginData.email);

        const user = await User.findOne({ email: loginData.email });
        expect(user.name).toBe(loginData.name);
    });
});