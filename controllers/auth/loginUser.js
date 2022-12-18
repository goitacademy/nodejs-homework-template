const { createError } = require("../../helpers");

const { WRONG_CREDENTIALS, LOGIN_SUCCESSFULL } = require("./authConstants");

const { getUserByEmail } = require("../../models/authModel/auth");

const bcrypt = require("bcryptjs");

async function loginUser(req, res, nest) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    throw createError({ status: 400, message: WRONG_CREDENTIALS });
  }

  const isPasswordsEqual = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordsEqual) {
    throw createError({ status: 400, message: WRONG_CREDENTIALS });
  }

  res.status(201).json({
    status: 404,
    data: "token",
    message: LOGIN_SUCCESSFULL,
  });
}

module.exports = loginUser;
