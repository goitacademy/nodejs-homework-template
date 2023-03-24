describe("Login controller test", () => {
  it("login with email and password", async () => {
    jest.mock("../auth/login.js", async () => {
      const controller = jest.requireActual("../auth/login.js")
      jest.spyOn(controller, "login")

      const req = { body: { email: "mango@ukr.net", password: "5555" } }
      const res = {}

      const result = await controller(req, res)

      expect(result.statusCode).toBe(200)
      expect(result.token).toBeTruthy()
      expect(result.email).toBeTruthy()
      expect(result.subscription).toBeTruthy()
      expect(result).toEqual({
        email: "mango@ukr.net",
        subscription: "starter",
      })
      expect(result.email).toMatch(/\w/)
      expect(result.subscription).toMatch(/\w/)
    })
  })
})

const { User } = require("../models")
const auth = require("../middlewares/auth")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const { SECRET_KEY } = process.env

describe("Auth middleware test", () => {
  it("should called next() and added user property to req object", async () => {
    const mockUserId = "123456"
    const token = jwt.sign({ _id: mockUserId }, SECRET_KEY)
    const user = {
      _id: mockUserId,
      email: "valdia@gmail.com",
      token,
    }

    const mReq = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const mRes = {}
    const mockNext = jest.fn()

    jest.spyOn(User, "findById").mockImplementationOnce(async () => user)

    await auth(mReq, mRes, mockNext)

    expect(mReq.mockUserId).toEqual(user.id)
    expect(mockNext).toHaveBeenCalled()
  })
})