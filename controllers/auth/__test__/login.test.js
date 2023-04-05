const app = require("../../../app");
const request = require("supertest");
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

describe("test post users/login", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL)
    });

    afterAll(async () => {
        await mongoose.connection.close();
    })
  test("test return login user and token", async () => {
    const testData = {
      email: "Marina@example.com",
      password: "Marina1234",
    };

    const response = await request(app).post("/api/users/login").send(testData);

      expect(response.status).toBe(200);
    //   expect(Array.isArray(response.body)).toBe(true);

//         //   expect(response.body.data.user).toBe("email");
//     // expect(typeof response.body.user.email).toBe("string");
//     // expect(response.body.user).toBe("subscription");
//     // expect(typeof response.body.user.subscription).toBe("string");
//     //   expect(response.body.user).toHaveProperty('token');
// expect(response.body).toEqual(
//     expect.objectContaining({
//               code: expect.any(200),
//         data: expect.objectContaining({
//             user: expect.objectContaining({
//                 email: expect.any(String),
//                 subscription: expect.any(String),
//                 token: expect.any(String)
//             }),

//         })
//           })
// )

      it("should return unathorized error", async () => {
    const testData = {
      email: "Marina@example.com",
      password: "Marina1234",
    };

    const response = await request(app).post("/api/users/login").send(testData);

    expect(response.statusCode).toBe(401);
  });
  }, 100000);
});
/** NOT WORKING */