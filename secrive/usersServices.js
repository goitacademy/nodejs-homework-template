require("dotenv");
const { HttpError } = require("../helpers/HttpError");
const userSchemaDB = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const registerUserService = async (userData) => {
  const res = await userSchemaDB.findOne({ email: userData.email });

  if (res) {
    throw new HttpError(409, "Email in use");
  }

  const hash = bcrypt.hashSync(userData.password, 10);
  const newUser = {
    email: userData.email,
    password: hash,
    avatarURL: gravatar.url(userData.email),
    verificationToken: userData.verificationToken,
  };

  const result = await userSchemaDB.create(newUser);
  return result.subscription;
};

const loginUserService = async (userData) => {
  const res = await userSchemaDB.findOne({ email: userData.email });
  if (!res) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const isSuccessPassword = bcrypt.compareSync(userData.password, res.password);

  if (!isSuccessPassword) {
    throw new HttpError(401, "Email or password is wrong");
  }

  if (!res.verify) {
    throw new HttpError(401, "Please verify your email");
  }

  const token = jwt.sign(
    { id: res._id, email: res.email },
    process.env.SECRET_TOKEN,
    { expiresIn: "1h" }
  );
  await userSchemaDB.findByIdAndUpdate(res._id, { token });
  return { token, subscription: res.subscription };
};

const logoutUserService = async (userId) => {
  await userSchemaDB.findByIdAndUpdate(userId, { token: null });
};

const subscriptionUserService = async (userId, subscription) => {
  return await userSchemaDB.findByIdAndUpdate(
    userId,
    { subscription },
    { new: true }
  );
};

const changeAvatarUserService = async (userId, filename) => {
  return await userSchemaDB.findByIdAndUpdate(userId, { avatarURL: filename });
};

const verifyUserService = async (verificationToken) => {
  const user = await userSchemaDB.findOne({ verificationToken });

  if (user === null) {
    throw new HttpError(404, "User not found");
  }
  await userSchemaDB.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
};

const verifyBegineUserService = async (email) => {
  console.log(email);
  const user = await userSchemaDB.findOne({ email });

  if (user === null) {
    throw new HttpError(404, "User not found");
  }
  if (user.verify) {
    throw new HttpError(400, "Verification has already been passed");
  }
  return user.verificationToken;
};

module.exports = {
  registerUserService,
  loginUserService,
  logoutUserService,
  subscriptionUserService,
  changeAvatarUserService,
  verifyUserService,
  verifyBegineUserService,
};
