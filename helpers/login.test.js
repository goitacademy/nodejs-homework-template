const app = require("../app");
const axios = require("axios");

describe("Testing login function", () => {
  let server;
  const PORT = process.env.PORT || 3000;

  axios.defaults.baseURL = `http://localhost:${PORT}/users`;

  beforeEach(() => {
    server = app.listen(PORT);
  });

  afterEach(() => {
    server.close();
  });

  test("login", async () => {
    const user = {
      email: "emma@hello.com",
      password: "MyCreativePassword",
    };

    await axios.post("/signup", user, {
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });

    const resp = await axios.post("/login", user);
    const status = resp.status;
    const token = resp.data.token;
    const userObject = resp.data.user;
    const userData = Object.keys(userObject);

    expect(status).toBe(200);
    expect(token).toBeTruthy();
    expect(typeof userObject).toBe("object");
    expect(userData.length).toBe(2);
    expect(userData).toContain("email");
    expect(typeof userObject.email).toBe("string");
    expect(userData).toContain("subscription");
    expect(typeof userObject.subscription).toBe("string");
  }, 50000);
});
