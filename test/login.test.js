const { default: mongoose } = require('mongoose');
const testReq = require('supertest');
const app = require('../app');
require('dotenv').config();

const { DB_HOST_TEST } = process.env;
let response;
describe('login', () => {
	beforeAll(async () => {
		await mongoose
			.connect(DB_HOST_TEST)
			.then(() => console.log('DB Connected'))
			.catch((err) => {
				console.log(err);
			});
		response = await testReq(app).post('/api/users/login').send({
			email: 'usertest1@gmail.com',
			password: '12345678',
		});
	});
	it('should return 200 status code', async () => {
		expect(response.statusCode).toBe(200);
	});
	it('should return a valid token', async () => {
		const { token } = response.body;
		expect(token).toBeDefined();
		expect(typeof token).toBe('string');
	});
	it('should return user object with email and subscription fields', async () => {
		expect(response.body.user).toBeDefined();
		expect(typeof response.body.user.email).toBe('string');
		expect(typeof response.body.user.subscription).toBe('string');
	});
	afterAll(async () => {
		await mongoose
			.disconnect(DB_HOST_TEST)
			.then(() => console.log('DB Disconnected'))
			.catch((err) => {
				console.log(err);
			});
	});
});
