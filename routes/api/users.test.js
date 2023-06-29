const axios = require("axios");
const url = "http://localhost:3000/api/users/";

describe("Testing UsersRouter", () => {
  test("login response should have code 200", async () => {
    const res = await axios.post(url + "login", {
      email: "jp@jp.com",
      password: "examplepassword",
    });
    expect(res.status).toBe(200);
  });

  test("login response should return token", async () => {
    const res = await axios.post(url + "login", {
      email: "jp@jp.com",
      password: "examplepassword",
    });
    expect(res.data.data.token).toBeTruthy();
  });

  test("login response should return user object with two string type fields: email, subscription", async () => {
    const res = await axios.post(url + "login", {
      email: "jp@jp.com",
      password: "examplepassword",
    });
    console.log(res.data.data);
    expect(res.data.data.user).toStrictEqual({
      email: "jp@jp.com",
      subscription: "starter",
    });
  });
});