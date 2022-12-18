const { createError } = require("../../helpers");

const { WRONG_CREDENTIALS, LOGIN_SUCCESSFULL } = require("./authConstants");

const {
  getUserByEmail,
  updateUserById,
} = require("../../models/authModel/auth");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const { JWT_SECRET_KEY } = process.env;

async function logInUser(req, res, nest) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    throw createError({ status: 400, message: WRONG_CREDENTIALS });
  }

  const isPasswordsEqual = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordsEqual) {
    throw createError({ status: 400, message: WRONG_CREDENTIALS });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

  await updateUserById({ id: user._id, body: { token } });

  res.status(200).json({
    status: 200,
    data: { token: token },
    message: LOGIN_SUCCESSFULL,
  });
}

module.exports = logInUser;
