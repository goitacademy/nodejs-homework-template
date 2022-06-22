let authService = require("../service/index");
const { registerController } = require("./auth");

describe("Auth test", () => {
  describe("Login", () => {
    test(" User login ", async () => {
      let next = jest.fn();
      authService.loginUser = jest.fn((data) => data);
      const req = {
        body: {
          email: "codajoker99@gmail.com",
          password: "1234567890",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };
      authService.loginUser = jest.fn(() => {
        return {
          token: "test-jwt-token",
        };
      });
      const result = await registerController(req, res, next);
      console.log(result);
      expect(result.data.token).toBe("codajoker9111@gmail.com");
    });
  });
  //   describe("Login", () => {
  //     second;
  //   });
});
