const { createHttpException } = require("../../helpers");
const { UserModel } = require("../../models");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../../services/jwt");

const signUp = async (req, res, next) => {
  const unauthorizedMessage = "User already exists";

  const { email, password, subscription } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const userInstance = await UserModel.create({
    email,
    passwordHash,
    subscription,
  }).catch(() => {
    throw createHttpException(401, unauthorizedMessage);
  });

  const accessToken = createAccessToken({ userId: userInstance._id });

  res.status(201).json({
    accessToken,
  });
};

module.exports = {
  signUp,
};
