const service = require("../service/userService");
const { validateUser } = require("../validator/userValidator");
const User = require("../service/schemas/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const registerUser = async (req, res, next) => {
  const { error, value } = validateUser(req.body);
  const { email, password } = value;
  const user = await User.findOne({ email });
  if (error) {
    res.status(400).json({
      status: "failure",
      code: 400,
      error: error.details,
    });
  } else {
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    } else {
      try {
        const result = await service.registerUser({ email, password });
        res.status(201).json({
          status: "success",
          code: 201,
          message: "User successfully registered!",
        });
      } catch (err) {
        console.log(err.message);
        next(err);
      }
    }
  }
};

const loginUser = async (req, res, next) => {
  const { error, value } = validateUser(req.body);
  const { email, password } = value;
  if (error) {
    res.status(400).json({
      status: "failure",
      code: 400,
      error: error.details,
    });
  }
  try {
    const user = await service.loginUser(email, password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      res.status(401).json({
        status: "failure",
        code: 401,
        message: "Email or password is wrong",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    await service.updateToken(user._id, token);

    res.json({
      status: "success",
      code: 200,
      message: "User successfully logged in",
      data: {
        token,
        user: { email: user.email, subscription: user.subscription },
      },
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const logoutUser = async (req, res, mext) => {
  if (!req.user || !req.user._id) {
    res.status(401).json({
      status: "failure",
      code: 401,
      message: "Not authorized",
    });
  }
  const userId = req.user._id;
  try {
    await service.logoutUser(userId);
    res.status(204).send();
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const checkCurrentUser = async (req, res, next) => {
  if (!req.user || !req.user._id) {
    res.status(401).json({
      status: "failure",
      code: 401,
      message: "Not authorized",
    });
  }
  try {
    const userId = req.user._id;
    const user = await service.getCurrentUser(userId);
    if (!user) {
      return res.status(401).json({
        status: "failure",
        code: 401,
        message: "Not authorized",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: { email: user.email, subscription: user.subscription },
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const updateUserSubscription = async (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const userId = req.user._id;
    const { subscription } = req.body;
    const updatedUser = await service.updateSubscription(userId, subscription);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      data: {
        user: {
          email: updatedUser.email,
          subscription: updatedUser.subscription,
        },
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  checkCurrentUser,
  updateUserSubscription,
};
