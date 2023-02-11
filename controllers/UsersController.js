const { User } = require("../models/UsersModel");
const { isValidObjectId } = require("mongoose");
const { Conflict, Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { JWT_SECRET } = process.env;

class UsersController {
  async register(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`User with this email: ${email} already registered`);
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !bcrypt.compare(password, user.password)) {
      throw new Unauthorized("Email is wrong");
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({ data: token, user: { email, subscription: user.subscription } });
  }

  async logout(req, res, next) {
    const { _id } = req.user;

    const user = await User.findByIdAndUpdate(_id, { token: null });

    if (!user) {
      throw new Unauthorized(`User with this ${_id} does not found`);
    }

    res.status(204).json({ status: "No content" });
  }

  async getCurrentUser(req, res, next) {
    const { _id } = req.user;

    const user = await User.findById(_id);

    if (!user) {
      throw new Unauthorized("Not authorized");
    }

    const { email, subscription } = user;
    res.status(200).json({ email: email, subscription: subscription });
  }
}

module.exports = new UsersController();
