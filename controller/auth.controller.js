const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res
      .status(409)
      .header("Content-Type", "application/json")
      .json({
        status: "conflict",
        code: 409,
        ResponseBody: {
          message: "Email in use",
        },
      });
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    res
      .status(201)
      .header("Content-Type", "application/json")
      .json({
        status: "created",
        code: 201,
        ResponseBody: {
          user: {
            email: email,
            subscription: "starter",
          },
        },
      });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(401).json({
      status: "unauthorized",
      code: 401,
      ResponseBody: {
        message: "Email or password is wrong",
      },
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
  user.token = token;
  await user.save();
  res
    .status(200)
    .header("Content-Type", "application/json")
    .json({
      status: "created",
      code: 201,
      ResponseBody: {
        token,
        user: {
          email,
          subscription: "starter", // TODO
        },
      },
    });
};

const logout = async (req, res, next) => {
  const id = req.user._id;

  const user = await User.findById(id);
  if (!user) {
    return res
      .status(401)
      .header("Content-Type", "application/json")
      .json({
        status: "Unauthorized",
        code: 401,
        ResponseBody: {
          message: "Not authorized",
        },
      });
  }

  user.token = null;
  await user.save();

  res.status(204).json({
    status: "no content",
    code: 204,
  });
};

module.exports = {
  signup,
  login,
  logout,
};
