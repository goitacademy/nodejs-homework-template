const jwt = require("jsonwebtoken");
const Users = require("../repository/users");
const { HttpCode } = require("../config/constants");
const CustomError = require("../helpers/customError");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const userRegistration = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await Users.findUserByEmail(email);
  if (user) {
    throw new CustomError(HttpCode.CONFLICT, "Email is already exist");
  }

  const newUser = await Users.create({ email, password, subscription });
  return res.status(HttpCode.CREATED).json({
    status: "success",
    cod: HttpCode.CREATED,
    data: {
      id: newUser.id,
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findUserByEmail(email);
  console.log(user);
  const isValidPassword = await user.isValidPassword(password);
  if (!user || !isValidPassword) {
    throw new CustomError(HttpCode.UNAUTHORIZED, "Invalid credentials");
  }

  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await Users.updateToken(id, token);
  return res.status(HttpCode.OK).json({
    status: "success",
    cod: HttpCode.OK,
    data: {
      token: token,
      user: { email: user.email, subscription: user.subscription },
    },
  });
};

const updateUserSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  // const user = req.user;

  const userId = req.user._id;
  const user = await Users.updateSubscription({ subscription }, userId);

  if (user) {
    return res.status(HttpCode.OK).json({
      status: "success",
      cod: HttpCode.OK,
      data: { user: { email: user.email, subscription: user.subscription } },
    });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not Found");
};

const userLogout = async (req, res, next) => {
  const id = req.user._id;
  await Users.updateToken(id, null);
  res.status(HttpCode.NO_CONTENT).json({});
};

module.exports = {
  userRegistration,
  userLogin,
  updateUserSubscription,
  userLogout,
};
