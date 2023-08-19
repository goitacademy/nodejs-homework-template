const request = require("supertest");
const app = require("../server");
/**
 * function logIn returns an Object res.
 * @param {*} req  - is Object with properties email, password
 * @param {*} res  - is Object with structure:
 * {token - is String,
    user: { email - is String, subscription - is String, avatarURL - is String},
  }}
 */

// const { logIn } = require("./auth");

describe("test logIn function", () => {
  test("result  - is an Object with expected properties", async () => {
    // Тестові дані для запиту
    const configRequest = { email: "iryna@gmail.com", password: "1234" };

    // Модель відповіді, якій має відповідати результат запиту
    const desiredRes = {
      token: expect.any(String),
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
        avatarURL: expect.any(String),
      },
    };

    // Отримуємо результат запиту з тестовими даними
    const result = await request(app).post("/users/login").send(configRequest);

    expect(result.statusCode).toBe(200);

    expect(result.body).toMatchObject(desiredRes);
  });
});
