const request = require("supertest");

const { connect, disconnect } = require("../../server");
const app = require("../../app");

const { TEST_EMAIL, TEST_PASSWORD } = process.env;

const credentials = { email: TEST_EMAIL, password: TEST_PASSWORD };

describe("test login controller", () => {
	beforeAll(() => {
		connect();
	});

	afterAll(() => {
		disconnect();
	});

	it("відповідь повина мати статус-код 200", async () => {
		const { statusCode } = await request(app)
			.post("/api/users/login")
			.send(credentials);

		expect(statusCode).toBe(200);
	});

	it("у відповіді повинен повертатися токен", async () => {
		const { body } = await request(app)
			.post("/api/users/login")
			.send(credentials);

		expect(body).toHaveProperty("token");
	});

	it("у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String", async () => {
		const { body } = await request(app)
			.post("/api/users/login")
			.send(credentials);

		expect(typeof body.user.email).toBe("string");
		expect(typeof body.user.subscription).toBe("string");
	});
});
