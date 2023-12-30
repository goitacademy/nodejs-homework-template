import mongoose from "mongoose";
import request from "supertest";

import app from "../app.js";
import User from "../models/user.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
const { DB_TEST_HOST, PORT = 2000 } = process.env;

describe("test login route", () => {
	let server = null;
	beforeAll(async () => {
		await mongoose.connect(DB_TEST_HOST);
		server = app.listen(PORT);
	});

	afterAll(async () => {
		await mongoose.connection.close();
		server.close();
	});

	afterEach(async () => {
		await User.deleteMany({});
	});

	test("test signin with correct data", async () => {
		const signupData = {
			email: "luckymangust@gmail.com",
			password: "mars751189",
            subscription: "starter"
		};

		await request(app).post("/api/users/register").send(signupData);

		const signinData = {
			email: "luckymangust@gmail.com",
			password: "mars751189",
		};

		const { statusCode, body } = await request(app).post("/api/users/login").send(signinData);

		expect(statusCode).toBe(200);
		expect(body.token).toBeDefined();

		// const user = await User.findOne({ email: signinData.email });
		expect(body.email).toBe(signinData.email);
        expect(typeof isEmptyBody.email).toBe("string")
        expect(body.subscription).toBe(signinData.subscription)
        expect(typeof body.subscription).toBe("string")
	});
});
