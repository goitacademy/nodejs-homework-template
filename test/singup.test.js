const express = require("express");
const request = require("supertest");
require("dotenv").config();
const port = process.env.PORT;

const { getCurrent } = require("../controllers/auth");

const app = express();

app.post("/login", getCurrent);

describe("test getCurrent controller", () => {
	beforeAll(async () => {
		const server = await app.listen(port);
	});

	afterAll(async () => {
		await server.close();
	});

	test("returns token and user object with email and subscription fields of type String", async () => {
		const user = {
			email: "example@mail.com",
			password: "password",
		};

		try {
			const response = await request(app).post("/login").send(user);
			expect(response.status).toBe(200);
			expect(response.body.token).toBeDefined();
			expect(response.body.user.email).toBeDefined();
			expect(typeof response.body.user.email).toBe("string");
			expect(response.body.user.subscription).toBeDefined();
			expect(typeof response.body.user.subscription).toBe("string");
			expect(response.body.user.expirationDate).toBeDefined();
			expect(typeof response.body.user.expirationDate).toBe("string");
		} catch (error) {
			console.error(error.message);
			throw error;
		}
	});
});

// const express = require("express");
// const request = require("supertest");
// require("dotenv").config();
// const port = process.env.PORT;
// /**
//  * 1. Given object with fields email and password
//  * 2. return token and given object
//  * 3. if something wrong, throw error with message
//  * 4. response must have status code 200
//    5. the response should return a token
//    6. the response should return a user object with 2 fields of email and subscription, expiration date data type String
//  */

// const { getCurrent } = require("../controllers/auth");

// const app = express();

// app.post("users/login", getCurrent);

// describe("test getCurrent controller", () => {
// 	beforeAll(() => app.listen(port));

// 	test("Given object with fields email and password", async () => {
// 		try {
// 			const res = await request(app).post("users/login");
// 			expect(response.status).toBe(200);
// 			console.log(res);
// 		} catch (error) {}
// 	});
// 	afterAll(() => process.exit(1));
// });
