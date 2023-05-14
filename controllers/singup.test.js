const express = require("express");
const request = require("supertest");
const cors = require("cors");

const { login } = require("./auth");

const app = express();
app.use(cors());
app.use(express.json());
app.post("/login", login);
let server;
describe("test getCurrent controller", () => {
	const user = {
		email: "anton@vebul.co.uk",
		password: "Ss7001010710",
	};
	beforeAll(() => {
		server = app.listen(80, () => {
			console.log(`Server listening on port 80`);
		});
	});

	test("returns token and user object with email and subscription fields of type String", async () => {
		const response = await request(app).post("/login").send(user);
		console.log(response.body);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body.token).toBeDefined();
		expect(response.body.user.email).toBeDefined();
		expect(typeof response.body.user.email).toBe("string");
		expect(response.body.user.subscription).toBeDefined();
		expect(typeof response.body.user.subscription).toBe("string");
	});
	afterAll(async () => {
		await server.close();
	});
});