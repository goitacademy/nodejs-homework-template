const { Types } = require("mongoose");

const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailServices = require("./mailServices");
const jwtServices = require("../services/jwtServices");

exports.signupServicesValidate = async (data) => {
  const newData = {
    ...data,
  };
  const newUser = await User.create(newData);
  newUser.password = undefined;

  // при регистрации мы сразу создаем токен и отправляем на главную
  const token = jwtServices.singToken(newUser.id);
  return { user: newUser, token };
};

// =================================================================

exports.registrationServices = async (email, password) => {
  const candidate = await User.findOne({ email });
  if (candidate) {
    throw new Error("пользователь существует");
  }
  const hashPassword = await bcrypt.hash(password, 3);
  const token = uuid.v4();
  const user = await User.create({ email, password: hashPassword });
  const tokenData = {
    id: user.id,
    email: user.email,
  };
  const tokens = jwtServices.singToken(tokenData);
  await jwtServices.saveToken(user.id, token.refreshToken);
  return {
    ...tokens,
    user: user.toObject(), // Преобразуйте Mongoose-документ в объект
  };
};
// ===

exports.checkUserExists = async (filter) => {
  const userExists = await User.exists(filter);
  if (!userExists) {
    throw new Error("User already exists");
  }
};

exports.getOneUser = async (id) => User.findById(id);
