const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../app");
const { User } = require("../src/service/__mocks__/data.js");
require("dotenv").config();

//генерируем новый валидный токен для юзера и подменяем у юзера на полученный
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

console.log(345345);
//подкидываем файковые данные из папки __mocks__
jest.mock("../src/service/contacts.js");
//jest.mock("../src/schemas/__mocks__/users.js");

describe("Testing the route api/contacts", () => {
  console.log(12134);
  describe("should handle get request", () => {
    it("should return 200 status for get all contacts", async (done) => {
      const res = await request(app)
        .get("/api/contacts")
        .set("Authorization", `Bearer ${token}`);
      //проверяем что должно возвращаеться  в результате
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contacts).toBeInstanceOf(Array);
      done();
    });
  });
  describe("should handle post request", () => {});
  describe("should handle patch request", () => {});
  describe("should handle delete request", () => {});
});
