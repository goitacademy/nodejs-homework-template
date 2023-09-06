require("dotenv");
const { HttpError } = require("../helpers/HttpError");
const userSchemaDB = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUserService = async (userData) => {
  const res = await userSchemaDB.findOne({ email: userData.email });

  if (res) {
    throw new HttpError(409, "Email in use");
  }

  const hash = bcrypt.hashSync(userData.password, 10);
  const newUser = {
    email: userData.email,
    password: hash,
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
  const token = jwt.sign(
    { id: res._id, email: res.email },
    process.env.SECRET_TOKEN,
    { expiresIn: "1h" }
  );
  await userSchemaDB.findByIdAndUpdate(res._id, { token });
  return { token, subscription: res.subscription };
};

const logoutUserService = async (userId) => {
  console.log(userId);
  await userSchemaDB.findByIdAndUpdate(userId, { token: null });
};

module.exports = {
  registerUserService,
  loginUserService,
  logoutUserService,
};
