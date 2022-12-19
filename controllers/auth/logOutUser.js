const { createError } = require("../../helpers");

const { WRONG_CREDENTIALS, LOGOUT_SUCCESSFULL } = require("./authConstants");

const { getUserById } = require("../../models/authModel/auth");

const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = process.env;

async function logOutUser(req, res, nest) {
  const { _id, token } = req.body;

  const user = await getUserById(_id);

  if (!user) {
    throw createError({ status: 400, message: WRONG_CREDENTIALS });
  }

  const isJwtEqual = jwt.verify(token, JWT_SECRET_KEY);

  // if (!isJwtEqual) {
  //   throw createError({ status: 400, message: WRONG_CREDENTIALS });
  // }

  // await updateUserById({ id: user._id, body: { token: "" } });

  if (isJwtEqual) {
    res.status(200).json({
      status: 200,
      message: LOGOUT_SUCCESSFULL,
    });
  }
  res.send();
}

module.exports = logOutUser;
