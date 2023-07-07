const service = require("../service/index");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const secret = process.env.SECRET;

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const existingUser = await service.findUser({ email: email });
    if (existingUser) {
      res.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email in use",
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createUser = await service.createUser({
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        user: {
          email: createUser.email,
          subscription: createUser.subscription,
        },
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const user = await service.findUser({ email: email });
    if (!user) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
      return;
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "2h" });
    const loginUser = await service.updateToken({ email, token });
    res.status(200).json({
      status: "OK",
      code: 200,
      data: {
        token: loginUser.token,
        user: {
          email: loginUser.email,
          subscription: loginUser.subscription,
        },
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const logout = async (req, res) => {
  const user = req.user;
  try {
    await service.updateToken({ email: user.email, token: null });
    res.status(204).json({
      status: "OK",
      code: 204,
      message: "Logged out",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const current = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
module.exports = {
  register,
  login,
  logout,
  current,
};
