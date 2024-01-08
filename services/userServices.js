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
  const token = "";
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

  // Определите, какие поля вы хотите включить в токен
  const tokenData = {
    id: user.id,
    email: user.email,
    // ...другие поля, если необходимо
  };

  const tokens = jwtServices.singToken(tokenData);
  await jwtServices.saveToken(user.id, token.refreshToken);

  return {
    ...tokens,
    user: user.toObject(), // Преобразуйте Mongoose-документ в объект
  };
};
