const HttpError = require("../controllers/helpers/error");
const models = require("../models");
const bcrypt = require("bcryptjs");
const { signToken } = require("./jwtService");

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
  const hash = hashPassword(data.password);
  const newUser = await models.UsersModel.create({
    email: data.email,
    password: hash,
  });
  newUser.password = undefined;

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
