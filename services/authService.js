const HttpError = require("../controllers/helpers/error");
const models = require("../models");
const bcrypt = require("bcryptjs");
const { signToken } = require("./jwtService");
const gravatar = require("gravatar");
const fs = require("fs").promises;
const utils = require("../utils");
const { v4: uuidv4 } = require("uuid");

// service functions
exports.uploadFile = async (temporaryName, originalName, userId) => {
  try {
    const avatarPath = await utils.proceedFile(temporaryName, originalName, userId);
    return avatarPath;
  } catch (err) {
    await fs.unlink(temporaryName);
    throw err;
  }
};

exports.updateAvatarPath = async (user, newAvatarPath) => {
  user.avatarURL = newAvatarPath;
  await user.save();
};

exports.checkUserExists = async (filter) => {
  const userExist = await models.UsersModel.exists(filter);

  if (userExist) throw new HttpError(409, "Email in use");
};

const hashPassword = (password) => {
  const salt = process.env.BCRYPT_SALT;
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

exports.signup = async (data) => {
  const avatarLink = gravatar.url(data.email, { protocol: "https", s: "100" }, true);
  const hash = hashPassword(data.password);
  const newUser = await models.UsersModel.create({
    email: data.email,
    password: hash,
    avatarURL: avatarLink,
    verificationToken: uuidv4(),
  });
  newUser.password = undefined;
  utils.sendMail(newUser.email, newUser.verificationToken);
  // const token = signToken(newUser.id);
  return { user: newUser };
};

exports.login = async ({ email, password }) => {
  const user = await models.UsersModel.findOne({ email: email }); //.select("+password")

  if (!user) throw new HttpError(401, "Not authrized..");

  const incomePassword = hashPassword(password);

  if (incomePassword !== user.password) throw new HttpError(401, "Wrong password...");

  const token = signToken(user.id);
  user.token = token;
  await user.save();

  user.password = undefined;

  return { user, token };
};

exports.logout = (currentUser) => {
  currentUser.token = "";
  currentUser.save();
  return currentUser;
};

exports.updateSubscription = (newSubscription, user) => {
  user.subscription = newSubscription.subscription;
  user.save();
  return user;
};

exports.checkVerificationToken = async (token) => {
  const user = await models.UsersModel.findOne({ verificationToken: token });
  if (!user) throw new HttpError(404, "User not found");

  user.verificationToken = null;
  user.verify = true;
  await user.save();
};
