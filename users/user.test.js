const { signupHandler, loginHandler } = require("./user.controller");
const { createUser, getUser, updateUser } = require("./user.dao");
const { generateAccessToken } = require("../auth/auth.service");
const httpMocks = require("node-mocks-http");

const testUser = {
  password: "test password",
  email: "test@email.com",
  subscription: "pro",
  token: "test-auth-token",
  avatarURL: "http://localhost:3000/avatars/test.jpg",
  verify: true,
};

jest.mock("./user.dao", () => ({
  createUser: jest.fn().mockResolvedValue(testUser),
  getUser: jest.fn().mockResolvedValue({
    ...testUser,
    validatePassword: jest.fn().mockResolvedValue(true),
  }),
  updateUser: jest.fn().mockResolvedValue(testUser),
}));

jest.mock("../auth/auth.service", () => ({
  generateAccessToken: jest.fn().mockReturnValue("new-token-generated"),
}));

describe("signupHandler test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user on signup", async () => {
    const res = httpMocks.createResponse();

    try {
      await signupHandler(
        {
          body: {
            email: "test@email.com",
            password: "test password",
          },
        },
        res
      );
    } catch (e) {
      throw new Error(e);
    }

    expect(createUser).toHaveBeenCalledWith({
      email: "test@email.com",
      password: "test password",
    });

    expect(res.statusCode).toEqual(201);
    expect(res._getData()).toEqual({
      user: {
        email: "test@email.com",
        subscription: "pro",
      },
    });
  });

  it("should update token and return user on login", async () => {
    const res = httpMocks.createResponse();

    try {
      await loginHandler(
        {
          body: {
            email: "test@email.com",
            password: "test password",
          },
        },
        res
      );
    } catch (e) {
      throw new Error(e);
    }

    expect(getUser).toHaveBeenCalledWith({ email: "test@email.com" });
    expect(generateAccessToken).toHaveBeenCalledWith({
      email: "test@email.com",
      subscription: "pro",
    });
    expect(updateUser).toHaveBeenCalledWith("test@email.com", {
      token: "new-token-generated",
    });

    expect(res.statusCode).toEqual(200);
    expect(res._getData()).toEqual({
      token: "new-token-generated",
      user: {
        email: "test@email.com",
        subscription: "pro",
      },
    });
  });
});
