// 1. Написати unit-тести для контролера входу (логін)
// За допомогою Jest

// відповідь повина мати статус-код 200
// у відповіді повинен повертатися токен
// у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

const request = require("supertest");
const app = require("../../app");
const mongoServer = require("../../server");
const { EMAIL_TEST, PASSWORD_TEST } = process.env;

const data = { email: EMAIL_TEST, password: PASSWORD_TEST };

describe("Login Controller", () => {
  beforeAll(() => {
    mongoServer.connect();
  });

  afterAll(() => {
    mongoServer.disconnect();
  });

  test("відповідь повина мати статус-код 200", async () => {
    const res = await request(app).post("/api/users/login").send(data);
    expect(res.status).toBe(200);
  });

  test("у відповіді повинен повертатися токен", async () => {
    const res = await request(app).post("/api/users/login").send(data);
    expect(res.body.token).toBeDefined();
  });

  test("у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String", async () => {
    const res = await request(app).post("/api/users/login").send(data);
    const user = res.body.user;

    expect(user).toBeDefined();
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
