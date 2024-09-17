/*
1. Принимает объект;
2. - ответ должен иметь статус-код 200;
   - в ответе должен возвращаться токен;
   - в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String;
3. Если получает некоректный тип данных - выьрасывает  ошибку с описанием что пошло не так.
*/

const register = require("../controllers/auth/register");

describe("test register function", () => {
  test("status - 201", async () => {
    const data = { body: { email: "alexa@mail.com", password: "qwerty" } };
    await register(data).then((r) => {
      expect(r.status).toBe("201");
    });
  });
});
