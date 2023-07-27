const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
require("dotenv").config();
/*
Login controller response on success

beforeAll:
- fill payload={ email: "user3@email.com", password: "123456" }
- connect to mongoDB

afterAll:
- disconnect from mongoDB

1.
1.1 should return res.status = 200
1.2 should return res.body.token string, not empty
1.3 should return object 'res.body.user' with 'name', 'email' and 'subscribtion' properties
1.4 type of returned 'res.body.user' properties 'name', 'email' and 'subscribtion' should be String
*/

describe("POST /api/auth/login on success", () => {
  let payload = {};
  beforeAll(() => {
    payload = { email: "user3@email.com", password: "123456" };
    mongoose.connect(process.env.DB_HOST);
  });
  afterAll(() => {
    mongoose.connection.close();
  });

  test("should return res.status = 200", async () => {
    const res = await request(app).post("/api/auth/login").send(payload);
    expect(res.statusCode).toBe(200);
  });
    
    test("should return res.body.token string, not empty", async () => {
        const res = await request(app).post("/api/auth/login").send(payload);
        expect(res.body).toHaveProperty("token");
      expect(typeof res.body.token).toBe("string");
      expect(res.body.token.length ).toBeGreaterThan(0);
    });

    test("should return object 'res.body.user' with 'name', 'email' and 'subscribtion' properties", async () => {
        const res = await request(app).post("/api/auth/login").send(payload);
        expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("name");
      expect(res.body.user).toHaveProperty("email");
      expect(res.body.user).toHaveProperty("subscribtion");
    });

    test("type of returned 'res.body.user' properties 'name', 'email' and 'subscribtion' should be String", async () => {
      const res = await request(app).post("/api/auth/login").send(payload);
      expect(typeof res.body.user.name).toBe("string");
      expect(typeof res.body.user.email).toBe("string");
      expect(typeof res.body.user.subscribtion === "string").toBeTruthy();
    });
});
