const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const gravatar = require("gravatar");

const User = require("../models/user");
const registerSchema = require("../schemas/register");
const loginSchema = require("../schemas/login");

async function register(req, res, next) {
  const { email, password } = req.body;
  try {
    const validationResult = registerSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (validationResult.error) {
      return res.status(400).send({
        message: `Validation error: ${validationResult.error.message}`,
      });
    }
    const user = await User.findOne({ email }).exec();

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }
    const avatarURL = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "identicon",
    });

    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ email, password: passwordHash, avatarURL });
    res.status(201).send({ message: "Registered successful" });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const validation = loginSchema.validate(
      { email, password },
      { abortEarly: false }
    );

    if (validation.error) {
      return res.status(400).json({
        message: `Validation error: ${validation.error.message}`,
      });
    }
    const user = await User.findOne({ email }).exec();

    if (user === null) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );

    await User.findByIdAndUpdate(user._id, { token }).exec();

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null }).exec();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, current, logout };
