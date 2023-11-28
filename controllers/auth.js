const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userSchema } = require("../schemas/users");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const avatarURL = gravatar.profile_url(`${email}`, {
    s: "200",
    r: "pg",
    d: "identicon",
  });
  // console.log(avatarURL);

  try {
    const validation = userSchema.validate({ email, password, avatarURL });
    if (validation.error) {
      const errorMessage = validation.error.details
        .map((error) => error.message)
        .join(", ");
      return res.status(400).send(`Validation Error: ${errorMessage}`);
    }

    const user = await User.findOne({ email }).exec();
    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userCreate = await User.create({
      email,
      password: passwordHash,
      avatarURL,
    });

    const responseData = {
      user: {
        email: userCreate.email,
        subscription: userCreate.subscription,
        // додати аватар при реєстрації
        avatarURL: userCreate.avatarURL,
      },
    };
    res.status(201).json(responseData);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validation = userSchema.validate({ email, password });
    if (validation.error) {
      const errorMessage = validation.error.details
        .map((error) => error.message)
        .join(", ");
      return res.status(400).send(`Validation Error: ${errorMessage}`);
    }

    const user = await User.findOne({ email }).exec();
    if (user === null) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    // підключення токена
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await User.findByIdAndUpdate(user._id, { token }).exec();
    res.send({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null }).exec();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const user = await User.findOne().exec();
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    res.send({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, current };
