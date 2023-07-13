const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { login } = require("./login"); 
const { User } = require("../models");
// Приклад вхідних даних для тестування
const req = {
  body: {
    email: "test@example.com",
    password: "password123",
  },
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// Mock-функція для User.findOne
const findOneMock = jest.fn().mockResolvedValue({
  _id: "user_id",
  email: "test@example.com",
  password: bcrypt.hash("password123", 10),
  subscription: "free",
});

// Mock-функція для bcrypt.compare
const compareMock = jest.fn().mockResolvedValue(true);

// Mock-функція для jwt.sign
const signMock = jest.fn().mockReturnValue("mocked_token");

// Mock-функція для User.findByIdAndUpdate
const findByIdAndUpdateMock = jest.fn().mockResolvedValue();

// Перед запуском тестів
beforeAll(() => {
  jest.spyOn(User, "findOne").mockImplementation(findOneMock);
  jest.spyOn(bcrypt, "compare").mockImplementation(compareMock);
  jest.spyOn(jwt, "sign").mockImplementation(signMock);
  jest.spyOn(User, "findByIdAndUpdate").mockImplementation(findByIdAndUpdateMock);
});

// Після запуску тестів
afterAll(() => {
  jest.restoreAllMocks();
});

// Тести
describe("loginUser", () => {
  it("should return status 200, token, and user object",  () => {
    login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "mocked_token",
      user: {
        email: "test@example.com",
        subscription: "free",
      },
    });
  });
});