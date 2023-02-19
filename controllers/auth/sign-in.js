const { createHttpException } = require("../../helpers");
const { UserModel } = require("../../models");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../../services/jwt");
const crypto = require("crypto");

const signIn = async (req, res, next) => {
  const unauthorizedMessage = "Invalid email or password";

  const { email, password } = req.body;

  const userInstance = await UserModel.findOne({ email });
  if (userInstance === null) {
    throw createHttpException(401, unauthorizedMessage);
  }

  const isValidPassword = await bcrypt.compare(
    password,
    userInstance.passwordHash
  );
  if (!isValidPassword) {
    throw createHttpException(401, unauthorizedMessage);
  }

  const sessionKey = crypto.randomUUID();

  await UserModel.findOneAndUpdate(
    { email },
    { sessionKey },
    { runValidators: true }
  );

  const accessToken = createAccessToken({
    userId: userInstance._id.toString(),
    sessionKey,
  });
  res.json({ accessToken });
};

module.exports = {
  signIn,
};
