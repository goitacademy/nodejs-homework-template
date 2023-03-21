const { getMockReq, getMockRes } = require("@jest-mock/express");
const loginCtrl = require("../../controllers/users/loginCtrl");
const { addNewUser } = require("../services/usersService");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongoServer = new MongoMemoryServer();
beforeAll(async () => {
  await mongoose.connect(await mongoServer.getUri(), {
    dbName: "verifyLOGIN",
  });
});

afterAll(async () => await mongoose.disconnect());

describe("Check method 'loginCtrl' ", () => {
  const { res, next } = getMockRes();

  test("example@mail.com, examplepassword => code(200), token, {email(String), subscription(String)", async () => {
    const newUser = { email: "example@mail.com", password: "examplepassword" };
    const user = await addNewUser(newUser);

    const req = getMockReq({ body: newUser });

    await loginCtrl(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: expect.anything(),
      user: {
        email: expect.stringContaining("example@mail.com"),
        subscription: expect.stringContaining("starter"),
      },
    });
  });

  test("signup: 1example@mail.com, 1examplepassword login: 1example@mail.com, 1example => code(401), Email or password is wrong", async () => {
    const newUser = {
      email: "1example@mail.com",
      password: "1examplepassword",
    };
    const user = await addNewUser(newUser);

    const falseUser = { email: "1example@mail.com", password: "1example" };

    const req = getMockReq({ body: falseUser });

    await loginCtrl(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email or password is wrong",
    });
  });

  test("signup: 2example@mail.com, 2examplepassword login: 123example@mail.com, 2examplepassword => code(401), Email or password is wrong", async () => {
    const newUser = {
      email: "2example@mail.com",
      password: "2examplepassword",
    };
    const user = await addNewUser(newUser);

    const falseUser = {
      email: "123example@mail.com",
      password: "2examplepassword",
    };

    const req = getMockReq({ body: falseUser });

    await loginCtrl(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email or password is wrong",
    });
  });

  test("signup: 3example@mail.com, 3examplepassword login: empty string, 3examplepassword => code(400)", async () => {
    const newUser = {
      email: "3example@mail.com",
      password: "3examplepassword",
    };
    const user = await addNewUser(newUser);

    const falseUser = { email: "", password: "3examplepassword" };

    const req = getMockReq({ body: falseUser });

    await loginCtrl(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("signup: 4example@mail.com, 4examplepassword login: 4examplemail.com, 4examplepassword => code(400)", async () => {
    const newUser = {
      email: "4example@mail.com",
      password: "4examplepassword",
    };
    const user = await addNewUser(newUser);

    const falseUser = {
      email: "4examplemail.com",
      password: "3examplepassword",
    };

    const req = getMockReq({ body: falseUser });

    await loginCtrl(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("signup: 5example@mail.com, 5examplepassword login: 5example@mail, 5examplepassword => code(400)", async () => {
    const newUser = {
      email: "5example@mail.com",
      password: "5examplepassword",
    };
    const user = await addNewUser(newUser);

    const falseUser = { email: "5example@mail", password: "5examplepassword" };

    const req = getMockReq({ body: falseUser });

    await loginCtrl(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
