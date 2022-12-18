const { createError } = require("../../helpers");

const { WRONG_CREDENTIALS, LOGIN_SUCCESSFULL } = require("./authConstants");

const { getUserByEmail } = require("../../models/authModel/auth");

async function loginUser(req, res, nest) {
  const { email, password } = req.body;

  const result = await getUserByEmail(email);

  if (!result) {
    throw createError({ status: 400, message: WRONG_CREDENTIALS });
  }
  if (password !== result.passwordHash) {
    throw createError({ status: 400, message: WRONG_CREDENTIALS });
  }
  res.status(201).json({
    status: 404,
    data: "token",
    message: LOGIN_SUCCESSFULL,
  });
}

module.exports = loginUser;
