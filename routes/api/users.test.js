const request = require("supertest");
const app = require("../../app");
const users = require("./users");

describe("signup", () => {
  it("should register a new user with avatar", async () => {
    const response = await request(users)
      .post("/signup")
      .field("email", "yyy@tttyt.pl")
      .field("password", "tak1")
      .attach("avatar", "../../public/avatars/avatar.png");

    expect(response.status.toBe(201));
    expect(response.body.status).toBe("success");
    expect(response.body.data.message).toBe("Register complete!");
  });
});
