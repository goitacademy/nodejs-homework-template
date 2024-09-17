const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

async function register(req, res, next) {
  const {  email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user !== null) {
      return res.status(409).send({ message: "User already registered" });
    }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ ...req.body, password: passwordHash })
     res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    }, });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user === null) {
      console.log("EMAIL");
      return res
        .status(401)
        .send({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      console.log("PASSWORD");
      return res
        .status(401)
        .send({ message: "Email or password is wrong" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 } 
    );

    await User.findByIdAndUpdate(user._id, { token }).exec();

      res.json({
          token,
          user: {
              email: user.email,
              subscription: user.subscription,
          },
      })
  } catch (error) {
    next(error);
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

module.exports = { register, login, logout };