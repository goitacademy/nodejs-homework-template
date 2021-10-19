const Users = require("../repository/users");
const jwt = require("jsonwebtoken");
const { HttpCode } = require("../config/constants");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const registration = async (req, res, next) => {
  const { name, email, password, subscription } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: "Error",
      code: HttpCode.CONFLICT,
      message: "Email is already use",
    });
  }
  try {
    const newUser = await Users.create({ name, email, password, subscription });
    return res.status(HttpCode.CREATED).json({
      status: "Success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  const isValidPassword = await user.isValidPassword(password);
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "Error",
      code: HttpCode.UNAUTHORIZED,
      message: "Invalid credentials",
    });
  }
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
  await Users.updateToken(id, token);
  return res.status(HttpCode.OK).json({
    status: "Success",
    code: HttpCode.OK,
    date: { token },
  });
};

const logout = async (req, res, next) => {
  res.json({});
};

module.exports = {
  registration,
  login,
  logout,
};
