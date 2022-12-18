const { createError, hashPassword } = require("../../helpers");

const { USER_ALLREADY_EXIST, USER_REGISTERED } = require("./authConstants");

const { register, getUserByEmail } = require("../../models/authModel/auth");

async function registerUser(req, res, next) {
  const { name, email, password } = req.body;

  const foundResult = await getUserByEmail(email);

  if (foundResult) {
    console.log(foundResult);
    throw createError({ status: 409, message: USER_ALLREADY_EXIST });
  }

  const newUser = {
    name: name,
    email: email,
    passwordHash: await hashPassword(password),
  };
  const result = await register(newUser);

  res.status(201).json({
    data: result,
    message: USER_REGISTERED,
  });
}

module.exports = registerUser;
