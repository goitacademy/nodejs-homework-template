const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../server"); // Upewnij się, że eksportujesz `app` w `server.js`
const User = require("../models/user");

describe("Auth: Login", () => {
  let user;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Tworzymy użytkownika testowego w bazie danych
    user = await User.create({
      email: "testuser@example.com",
      password: "$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Ra3Eohv3lVwMOpBxkS6.", // bcrypt hash dla "password123"
      subscription: "starter",
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  test("Powinien zwrócić token i dane użytkownika po poprawnym logowaniu", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "testuser@example.com",
      password: "password123", // Hasło powinno być poprawne
    });

    expect(res.status).toBe(200); // Sprawdzenie statusu odpowiedzi
    expect(res.body).toHaveProperty("token"); // Sprawdzenie, czy zwracany jest token
    expect(typeof res.body.token).toBe("string"); // Token powinien być stringiem

    expect(res.body).toHaveProperty("user"); // Sprawdzenie, czy zwracany jest użytkownik
    expect(res.body.user).toHaveProperty("email", "testuser@example.com"); // Email powinien być poprawny
    expect(res.body.user).toHaveProperty("subscription", "starter"); // Subskrypcja powinna być poprawna

    expect(typeof res.body.user.email).toBe("string"); // Email powinien być stringiem
    expect(typeof res.body.user.subscription).toBe("string"); // Subskrypcja powinna być stringiem
  });

  test("Powinien zwrócić błąd 401 dla niepoprawnego hasła", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401); // Oczekujemy statusu 401 (Unauthorized)
    expect(res.body).toHaveProperty("message", "Email or password is wrong"); // Komunikat błędu
  });

  test("Powinien zwrócić błąd 400, jeśli brakuje emaila lub hasła", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "testuser@example.com",
    });

    expect(res.status).toBe(400); // Oczekujemy statusu 400 (Bad Request)
    expect(res.body).toHaveProperty("message"); // Powinna być wiadomość błędu
  });
});
