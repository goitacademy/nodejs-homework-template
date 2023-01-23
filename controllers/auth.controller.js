const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { CustomError } = require("../helpers/index");

async function register(req, res, next) {
  const { email, password, subscription } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
      subscription,
    });

    return res.status(201).json({
      user: {
        email: savedUser.email,
        subscription: savedUser.subscription,
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      return next(new CustomError(409, "User with this email already exists"));
    }
    throw error;
  }
}

// 1. find user by email
// 2. If user not exits ==> throw error 404
// 3. If user exists ==> check password
// 4. if password the same ==> return status 200

async function login(req, res, next) {
  const { email, password } = req.body;
  const storedUser = await User.findOne({
    email,
  });
  console.log("login", storedUser);
  if (!storedUser) {
    return next(new CustomError(401, "Email or password is wrong"));
  }
  const isPasswordValid = await bcrypt.compare(password, storedUser.password);
  console.log(isPasswordValid);
  if (!isPasswordValid) {
    return next(new CustomError(401, "Email or password is wrong"));
  }
  const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.json({
    token,
    user: {
      email,
      subscription: storedUser.subscription,
    },
  });
}

async function logout(req, res, next) {
  try {
    const { _id } = req.body.user;

    const user = await User.findByIdAndUpdate(_id, { token: null });

    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
  logout,
};
