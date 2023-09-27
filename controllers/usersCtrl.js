const HttpError = require("../helpers/HttpError");
const {
  registerUserInDB,
  loginUserInDB,
  logoutFromDB,
  updateUserSubscriptionInDB,
} = require("../models/users");

const registerUser = async (req, res, next) => {
  try {
    const newUser = await registerUserInDB(req.body);
    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      next(HttpError(409, "Email is already taken"));
    }
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const result = await loginUserInDB(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await logoutFromDB(req.user);
    res.status(204).json();
    next();
  } catch (error) {
    next(error);
  }
};

const updateUserSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const { userId } = req.params;
    const result = await updateUserSubscriptionInDB(
      req.user,
      userId,
      subscription
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrent,
  logout,
  updateUserSubscription,
};
