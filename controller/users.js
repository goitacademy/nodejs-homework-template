const User = require("../service/schemas/user");
const Joi = require("joi");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const schema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
  token: Joi.string().default(null),
});

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {

    if (err) {
      console.error("Authentication error:", err);
      return res.status(401).json({
        status: "401 Unauthorized",
        contentType: "application/json",
        responseBody: { message: "Not authorized" },
      });
    }

    if (!user) {
      console.error("User not found or invalid token:", info);
      return res.status(401).json({
        status: "401 Unauthorized",
        contentType: "application/json",
        responseBody: { message: "Not authorized" },
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

const register = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  const user = await User.findOne({ email: req.body.email });

  if (error) {
    return res.status(400).json({
      status: "400 Bad Request",
      contentType: "application/json",
      responseBody: error.message,
    });
  }

  if (user) {
    return res.status(409).json({
      status: "409 Conflict",
      contentType: "application/json",
      responseBody: {
        message: "Email in use",
      },
    });
  }

  try {
    const newUser = new User({
      email: req.body.email,
    });
    await newUser.setPassword(req.body.password);
    await newUser.save();

    res.status(201).json({
      status: "201 Created",
      contentType: "application/json",
      responseBody: {
        user: {
          email: req.body.email,
          subscription: "starter",
        },
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "400 Bad Request",
      contentType: "application/json",
      responseBody: error.message,
    });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({
      status: "401 Unauthorized",
      responseBody: {
        message: "User with this email doesn't exist",
      },
    });
  }

  const isPasswordValid = await user.validatePassword(req.body.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      status: "401 Unauthorized",
      responseBody: {
        message: "Incorrect password",
      },
    });
  }

  try {
    const payload = {
      id: user._id,
      username: user.username,
    };
    const secret = process.env.AUTH_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: "12h" });

    return res.json({
      status: "200 OK",
      contentType: "application/json",
      responseBody: {
        token: token,
        user: {
          email: req.body.email,
          subscription: "starter",
        },
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const logout = async (req, res, next) => {
 
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        status: "401 Unauthorized",
        responseBody: { message: ":o" },
      });
    }

    user.token = null;
    await user.save();

    return res.status(204).json({
      status: "204 No Content",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  auth,
};