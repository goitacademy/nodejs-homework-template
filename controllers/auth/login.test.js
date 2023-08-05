// const request = require('supertest');

// const app = require('../../app');

// describe('POST /login', () => {
//     beforeAll(() => {
//         console.log('before all');
//     });

//     afterAll(() => {
//         console.log('after all');
//     });

//     it('should return user object and jwt', async () => {
//         const testData = {
//             email: 'nata@example.com',
//             password: 'examplepassword',
//         };

//         const res = await request(app).post('/login').send(testData);

//         expect(res.statusCode).toBe(200);
//         expect(res.body).toEqual(
//             expect.objectContaining({
//                 token: expect.any(String),
//                 user: expect.any(Object),
//             })
//         );
//     })
// });