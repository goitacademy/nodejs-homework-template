const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bCrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const {
  findUserByEmail,
  updateKeyForUser,
  findUserByToken,
} = require("../service/user.service");
const User = require("../models/user.model");
const { send } = require("../service/email.service");
const { v4: uuidv4 } = require("uuid");
const SECRET = process.env.SECRET;

const userSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(7).required(),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const hashPassword = async (password) => {
  const salt = await bCrypt.genSalt(10);
  const hash = await bCrypt.hash(password, salt);
  return hash;
};

const validatePassword = (password, hash) => bCrypt.compare(password, hash);

const passwordValidator = async (password, userPassword) => {
  const isValidPassword = await validatePassword(password, userPassword);
  return isValidPassword;
};

const findUser = async (email) => {
  try {
    const user = await findUserByEmail(email);
    return user;
  } catch (err) {
    console.error(err);
  }
};

const signup = async (req, res, _) => {
  try {
    const { value, error } = userSchema.validate(req.body);
    const { email, password } = value;

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const toLowerCaseEmail = email.toLowerCase();
    const user = await findUserByEmail(toLowerCaseEmail);

    if (user) {
      return res.status(409).json({
        status: "Error",
        code: 409,
        message: "Email in use",
        data: "Conflict",
      });
    }

    const hashedPassword = await hashPassword(password);

    const verificationToken = uuidv4();
    send(email, verificationToken);

    await new User({
      email: toLowerCaseEmail,
      password: hashedPassword,
      verificationToken: verificationToken,
    }).save();
    res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        user: {
          email: toLowerCaseEmail,
          subscription: "starter",
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const login = async (req, res, _) => {
  try {
    const { value, error } = userSchema.validate(req.body);
    const { email, password } = value;

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const toLowerCaseEmail = email.toLowerCase();
    const user = await findUserByEmail(toLowerCaseEmail);
    const id = user.id;
    const isPasswordValid = await passwordValidator(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
        data: "Unauthorized",
      });
    }

    const payload = { id };
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    await updateKeyForUser({ token }, id);

    return res.json({
      status: "Success",
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Server error",
    });
  }
};

const logout = async (req, res, _) => {
  try {
    let token = req.user.token;

    if (!token) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }

    const user = await findUserByToken(token);
    const id = user.id;
    token = null;
    await updateKeyForUser({ token }, id);
    return res.json({
      status: "Success",
      code: 200,
      message: "User successfully logged out",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Server error",
    });
  }
};

const getCurrentUser = async (req, res, _) => {
  try {
    const token = req.user.token;

    if (!token) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }
    const user = await findUserByToken(token);
    return res.json({
      status: "Success",
      code: 200,
      data: {
        currentUser: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Server error",
    });
  }
};

const updateUserSubscription = async (req, res) => {
  try {
    const { value, error } = userSubscriptionSchema.validate(req.body);
    const { subscription } = value;

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const userId = req.user.id;

    await updateKeyForUser({ subscription }, userId);
    return res.json({
      status: "Success",
      code: 200,
      message: `User's subscription changed successfully to ${subscription}.`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Server error",
    });
  }
};

module.exports = {
  findUser,
  signup,
  login,
  logout,
  getCurrentUser,
  updateUserSubscription,
};
