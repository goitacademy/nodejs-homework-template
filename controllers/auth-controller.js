import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { get } from "http";

const { JWT_SECRET } = process.env;

// провірити маршрути
// тут логыка реэстрацыъ користувача, метод
// Створення нового завдання. Викликаємо у моделі метод create

const signup = async (req, res) => {
  // провірка чи такий користувач вже існує по пошті
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

// це залишити на кінець, щоб спочатку запрацював регіст
//а потім вже це, щоб перевірити токен

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  ////////////// do token ////////
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  console.log(subscription, email);

  res.json({
    email,
    subscription,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
};

///////////////////////////////// done //////////////////////
// папка hooks

// export const saveError = (error, data, next) => {
//   const { name, code } = error;
//   error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
//   error.status = 400;
//   next();
// };

//(name === "MongoServerError" && code === 11000) - перевіряє, чи пошта другий раз юзається - 1 відео 37хв
//  але фронтенду треба норм повідомлення - що такий емейл вже занятий, тому це треба прописати в
//  контролері сайн ап
