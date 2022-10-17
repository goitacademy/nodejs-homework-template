const { auth } = require("../controllers");

// eslint-disable-next-line no-undef
describe("user login", () => {
  // eslint-disable-next-line no-undef
  it("response code should be 200", () => {
    const req = {
      body: { email: "2", password: "1" },
    };

    // eslint-disable-next-line no-undef
    expect(auth.loginUser(req)).toEqual({ code: 200 });
  });
});

// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });
