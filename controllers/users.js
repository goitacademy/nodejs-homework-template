const jwt = require("jsonwebtoken");
const Users = require("../repository/users");
const { HttpCode } = require("../config/constants");
const CustomError = require("../helpers/customError");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const userRegistration = async (req, res, next) => {
  // 1. из req.body достаем все нужные поля {email, password, subscription, token?}
  // 2. ищем и вытаскиваем user с помощью ф-ии из repos findUserByEmail(email, который мы получили в 1.)
  // 3. Если user существует отдаем ошибку
  // 4 try создаем user
  // 5.catch ловим ошибку
  const { email, password, subscription } = req.body;
  const user = await Users.findUserByEmail(email);
  if (user) {
    // CONFLICT +
    // 400 "It's ValidationError" если убрать одну строку из боди
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
  const isValidPassword = await user.isValidPassword(password);
  if (!user || !isValidPassword) {
    // UNAUTHORIZED+
    // 404 in app.js +
    // 500 +  because havn't validation
    throw new CustomError(HttpCode.UNAUTHORIZED, "Invalid credentials");
  }
  // res.json({});
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await Users.updateToken(id, token);
  return res.status(HttpCode.OK).json({
    status: "success",
    cod: HttpCode.OK,
    data: { token },
  });
};
const userLogout = async (req, res, next) => {
  const id = req.user._id;
  await Users.updateToken(id, null);
  throw new CustomError(HttpCode.NO_CONTENT);
};

module.exports = {
  userRegistration,
  userLogin,
  userLogout,
};
