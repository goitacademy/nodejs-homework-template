import mongoose from "mongoose";
import request from "supertest";

import app from "../app.js";
import User from "../models/user.js";


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

	test("test signin with correct status", async () => {
		const signupData = {
			email: "luckymangust@gmail.com",
			password: "mars751189",
		};

		await request(app).post("/api/users/register").send(signupData);

		const signinData = {
			email: "luckymangust@gmail.com",
			password: "mars751189",
		};

		const { statusCode} = await request(app).post("/api/users/login").send(signinData);

		expect(statusCode).toBe(200);
		// expect(body.token).toBeDefined();

		// const user = await User.findOne({ email: signinData.email });
		// expect(user.email).toBe(signinData.email);
        // expect(typeof user.email).toBe("string")
        // expect(user.subscription).toBe(signinData.subscription)
        // expect(typeof user.subscription).toBe("string")
	});

    test("test signin with correct token", async () => {
        const signupData = {
			email: "luckymangust@gmail.com",
			password: "mars751189",
		};

        await request(app).post("/api/users/register").send(signupData);

        const signinData = {
			email: "luckymangust@gmail.com",
            password: "mars751189",
		};

        const { body} = await request(app).post("/api/users/login").send(signinData);

        expect(body.token).toBeDefined()
    })

    test("test signin with correct email response", async () => {
        const signupData = {
			email: "luckymangust@gmail.com",
            password: "mars751189",
		};

        await request(app).post("/api/users/register").send(signupData);

        const signinData = {
			email: "luckymangust@gmail.com",
            password: "mars751189",
		};

        const user = await User.findOne({email: signinData.email})
        expect(user.email).toBe(signinData.email)
    })

    test("test signin with correct type of email", async() => {
        const signupData = {
			email: "luckymangust@gmail.com",
            password: "mars751189",
		};

        await request(app).post("/api/users/register").send(signupData);

        const signinData = {
			email: "luckymangust@gmail.com",
            password: "mars751189",
		};

        const user = await User.findOne({email: signinData.email})
        expect(typeof user.email).toBe("string")
    })

});
