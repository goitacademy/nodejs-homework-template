const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const requestError = require("../error/errorHandler");
require('dotenv').config();

class UserController {
  async getUser(req, res) {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(process.env.SECRET_KEY);
    if (!user) {
      throw requestError(401, `No user with such email`);
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw requestError(401, `Email or password is wrong`);
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token: token,
      user: { email: user.email, password: user.subscription },
    });
  }

  async logout(req, res) {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
  }

  async register(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw requestError(409, `User with email ${email} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  }

  async updateSubscription(req, res) {
    const { _id } = req.user;
    const { subscription } = req.body;

    const result = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    return res.status(200).json(result);
  }

}

module.exports = new UserController();
