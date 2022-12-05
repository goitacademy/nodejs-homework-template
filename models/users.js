const jwt = require("jsonwebtoken");
const User = require("../services/userSchema");
require("dotenv").config();
const secret = process.env.SECRET;

const {
  isValidPassword,
  incryptPassword,
} = require("../middleware/validatePassword");

const registration = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(409)
      .json({ message: "Email in use", status: "409 Conflict" });
  }
  try {
    const incryptedPassword = incryptPassword(password);
    await User.create({ password: incryptedPassword, email });
    return res
      .status(201)
      .json({ data: { password, email }, status: "201 Created" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);

  if (!user || !isValidPassword(password, user.password)) {
    return res.status(401).json({
      message: "Email or password is wrong",
      status: "401 Unauthorized",
    });
  }
  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res.status(200).json({
    status: "200 OK",
    data: {
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = {
  registration,
  login,
};
