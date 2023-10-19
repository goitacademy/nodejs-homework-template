import mongoose from "mongoose"
import request from "supertest";
import app from "../../app.js"
import User from "../../models/user.js";

const { TEST_DB_HOST } = process.env;


describe("test signup route", () => {
    let server = null;
    beforeAll(async () => {
        await mongoose.connect(TEST_DB_HOST);
        server = app.listen(3000);
    })

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    })

    afterEach(async () => {
        await User.deleteMany({})
    })

    test("test signup with correct data", async () => {
        const signupData = {
            email: "examplev2@gmail.com",
            password: "examplepassword"
        }
        const { statusCode, body } = await request(app).post("/users/register").send(signupData);
console.log(body)
        expect(statusCode).toBe(201);
        expect(body.email).toBe(signupData.email);
        expect(body.subscription).toBe("starter");

        const user = await User.findOne({ email: signupData.email });
        expect(user.email).toBe(signupData.email)
    })
})