const bcrypt = require("bcrypt");
const { httpError } = require("../helpers/helpers");
const { User } = require("../models/users");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const savedUser = await User.create({ email, password: hashedPassword });
    return res.status(201).json({ user: { email, id: savedUser._id } });
  } catch (error) {
    if (error.code === 11000) {
      next(httpError(409, "Email in use"));
    }
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const storedUser = await User.findOne({ email });

  if (!storedUser) {
    throw new httpError(401, "Email is wrong");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw new httpError(401, "Password is wrong");
  }

  const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.status(200).json({
    token,
    user: {
      email,
      subscription: "starter",
    },
  });
}

async function logout(req, res, next) {
  const { email, password } = req.body;
  const storedUser = await User.findOne({ email });

  if (!storedUser) {
    throw new httpError(401, "Email is wrong");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw new httpError(401, "Password is wrong");
  }

  const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.status(200).json({
    token,
    user: {
      email,
      subscription: "starter",
    },
  });
}

module.exports = {
  register,
  login,
  logout,
};
