const request = require('supertest');
const app = require('../../server');

describe("test POST login", () => {
	it("should return user object", async () => {
		const testDATA = {
			email: "vlagop@gmail.com",
			password: "Qwerty_1234uuy",
		};

		const res = await request(app).post('/api/user/login').send(testDATA);
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(
			expect.objectContaining({
				token: expect.any(String),
				user: {
					email: expect.any(String),
					subscription: expect.any(String),
				}
			})
		);
	});
});