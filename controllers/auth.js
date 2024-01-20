const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const User = require("../models/users");

const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require(path.join(__dirname, "../schemas/users"));

async function register(req, res, next) {
  const response = registerSchema.validate(req.body, {
    abortEarly: false,
  });
  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .json({ message: "Помилка від Joi або іншої бібліотеки валідації" });
  }

  const { email, password } = req.body;

  try {
    const newUser = await User.findOne({ email });

    if (newUser !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({ email: email, password: passwordHash });

    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const response = loginSchema.validate(req.body, {
    abortEarly: false,
  });
  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .json({ message: "Помилка від Joi або іншої бібліотеки валідації" });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      console.log("Email");
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      console.log("Password");
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, subscription: user.subscription },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await User.findByIdAndUpdate(user._id, { token });

    return res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  const { email } = req.user;

  const user = await User.findOne({ email });

  res.json({
    email: user.email,
    subscription: user.subscription,
  });
}

async function updateSubscription(req, res, next) {
  const response = updateSubscriptionSchema.validate(req.body, {
    abortEarly: false,
  });
  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .json({ message: "Помилка від Joi або іншої бібліотеки валідації" });
  }

  const { subscription } = req.body;
  const { id } = req.user;
  console.log(req.user);

  try {
    await User.findByIdAndUpdate(id, { subscription });

    res.status(200).json({
      message: `Subscription ${id} has been updated to ${subscription}`,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, logout, current, updateSubscription };
