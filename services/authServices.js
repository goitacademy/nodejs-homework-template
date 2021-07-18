const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");
const {
  NotAuthorizedError,
  ValidationError,
  WrongParametersError,
} = require("../helpers/errors");

const registration = async (email, password, subscription, token) => {
  let user;
  let newMail = await User.findOne({ email });
  if (newMail === null) {
    user = new User({ email, password, subscription, token });
    await user.save();
  } else if (newMail.email == email) {
    throw new WrongParametersError("Email in use");
  } else if (!user) {
    throw new ValidationError(
      "<Ошибка от Joi или другой библиотеки валидации>"
    );
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError(
      `Ошибка от Joi или другой библиотеки  валидации`
    );
  }
  if (!bcrypt.compare(password, user.password)) {
    throw new NotAuthorizedError("Email or password is wrong");
  }
  const token = jwt.sign(
    {
      _id: user.id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );
  await User.findByIdAndUpdate({ _id: user._id }, { token: token });
  return token;
};
const currentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotAuthorizedError(
      `Ошибка от Joi или другой библиотеки  валидации`
    );
  }
  return user;
};

const logout = async (userId) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotAuthorizedError(`Not authorized`);
  }
  await User.findOneAndUpdate({ _id: userId }, { token: null });
  return user;
};
module.exports = {
  registration,
  login,
  currentUser,
  logout,
};
