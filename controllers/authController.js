const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

//register function
async function register(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (user !== null) {
      return res.status(409).send({ message: "user already register!" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: passwordHash,
    });
    res.status(201).send({
      user: {
        email: email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

//login function
async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    if (email === undefined || password === undefined) {
      return res.status(400).send({ message: "missing some fields" });
    }
    const user = await User.findOne({ email }).exec();
    if (user === null) {
      return res
        .status(401)
        .send({ message: "email or password is incorrect" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      return res
        .status(401)
        .send({ message: "email or password is incorrect" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const loginUser = await User.findByIdAndUpdate(user._id, { token });

    return res.send({
      token: token,
      user: {
        email: email,
        subscription: loginUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
  res.send("OK");
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null }).exec();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  try {
    const user = await User.findById(req.user.id).exec();
    return res.status(200).send({
      email: req.user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
}

function uploadAvatar(req, res, next) {
  res.send({ message: "load Avatar!" });
}

module.exports = { register, login, logout, current, uploadAvatar };
