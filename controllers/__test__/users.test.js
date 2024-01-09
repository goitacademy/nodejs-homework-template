const request = require("supertest");

const app = require("../../app");

describe("test POST /users/login", () => {
    beforeAll(() => console.log("BEFORE ALL"));
    beforeEach(() => console.log("BEFORE EACH"));
    afterEach(() => console.log("AFTER EACH"));
    afterAll(() => console.log("AFTER ALL"));

    it('should return user object and jwt', async () => {
        const testData = {
            email: "avatarka@test.ua",
            password: "pass_1234",
        };
        const result = await request(app).post("/api/users/login").send(testData);

        // expect(result.statusCode).toBe(200);
        // expect(result.body).toEqual(
        //   expect.objectContaining({
        //     token: expect.any(String),
        //     user: expect.any(Object),
        //   })
        //);

        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(
            expect.objectContaining({
                ResponseBody: expect.objectContaining({
                    token: expect.any(String),
                    user: expect.any(Object),
                })
            })
        );
    })
})