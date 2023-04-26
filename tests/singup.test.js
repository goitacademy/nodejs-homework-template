const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
require("dotenv").config();

/* Connecting to the database before each test. */

const uriDb = process.env.DB_HOST;
const port = process.env.PORT;
beforeEach(async () => {
	mongoose.set("strictQuery", true);

	mongoose
		.connect(uriDb)
		.then(() => {
			console.log("Database connection successful");
			app.listen(port, () => {
				console.log(`Server running. Use our API on port: ${port}`);
			});
		})
		.catch((err) => {
			console.log(`Server not running. Error message: ${err.message}`);
			mongoose.connection.close();
		});
});

/* Closing database connection after each test. */
afterEach(async () => {
	await mongoose.connection.close();
});

describe("test getCurrent controller", () => {
	const user = {
		email: "anton@vebul.co.uk",
		password: "Ss7001010710",
	};
	test("returns token and user object with email and subscription fields of type String", async () => {
		const response = await request(app).post("users/login").send(user);
		console.log(response.body);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body.token).toBeDefined();
		expect(response.body.token).toBe("string");
		expect(response.body.user.email).toBeDefined();
		expect(typeof response.body.user.email).toBe("string");
		expect(response.body.user.subscription).toBeDefined();
		expect(typeof response.body.user.subscription).toBe("string");
	});
});
