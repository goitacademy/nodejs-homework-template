const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../service/schemas/user");
require("dotenv").config();
const secret = process.env.SECRET;

const Joi = require("joi");

// Validation schema for registration
const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  username: Joi.string().required(),
});

// Validation schema for login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const register = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Registration validation error",
        data: error.details[0].message,
      });
    }

    // Check if email is already in use
    const { email, username, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }

    // Create a new user
    const newUser = new User({ username, email });
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
        user: {
          email,
          username,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Login validation error",
        data: error.details[0].message,
      });
    }

    // Find user by email
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check if user and password are valid
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Email or password is wrong",
        data: "Unauthorized",
      });
    }

    // Generate and send token
    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "12h" });
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Clear the token in the user model
    user.token = null;
    await user.save();

    res.status(204).send(); // Logout success response
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

const listUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: user: ${email} , subscription: ${subscription}`,
    },
  });
};

module.exports = {
  register,
  login,
  logout,
  auth,
  listUser,
};
