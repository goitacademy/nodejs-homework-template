const HttpError = require("../utils/HttpError.js");
const { createAvatarURL } = require("../utils/avatarURL.js");
const schemas = require("../schema/authSchema");
const User = require("../service/schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const { error } = schemas.authSchema.validate(req.body, {
      errors: { wrap: { label: false } },
      messages: { "any.required": "missing required {{#label}} field" },
    });
    if (error) {
      throw HttpError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        message: "Email in use",
      });
      return;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: passwordHash,
      avatarURL: createAvatarURL(email),
    });
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { error } = schemas.authSchema.validate(req.body, {
      errors: { wrap: { label: false } },
      messages: {
        "any.required": "missing required {{#label}} field",
        "string.min": "password should have a minimum length of {{#limit}}",
      },
    });
    if (error) {
      throw HttpError(400, error.message);
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user === null) {
      res.status(401).send({ message: "Email or password is wrong" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      res.status(401).send({ message: "Email or password is wrong" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, subscription: user.subscription },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    const subscription = user.subscription;
    await User.findByIdAndUpdate(user._id, { token });

    res.send({ token, user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res
      .status(200)
      .json({ email: user.email, subscription: user.subscription });
  } catch (error) {
    next(error);
  }
};

const updateSub = async (req, res, next) => {
  try {
    const { error } = schemas.authUpdateSub.validate(req.body, {
      errors: { wrap: { label: false } },
      messages: { "any.required": "missing required {{#label}} field" },
    });
    if (error) {
      throw HttpError(400, error.message);
    }
    await User.findByIdAndUpdate(
      req.user.id,
      {
        subscription: req.body.subscription,
      },
      { runValidators: true }
    );
    res.status(201).json({
      user: {
        subscription: req.body.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  currentUser,
  updateSub,
};
