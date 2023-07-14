const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const HttpError = require("../error/errorHandler");
const modifier = require('../middlewares/modifier');
const gravatar = require('gravatar');
const fs = require("fs/promises");
const path = require("path");

const avatarDir = path.join(__dirname, "../", "public", "avatars");
require("dotenv").config();

class UserController {
  async getUser(req, res) {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(process.env.SECRET_KEY);
    if (!user) {
      next(HttpError(401, `Email or password is wrong`));
      return;
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({message: "Email or password is wrong"})
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "23h",
    });
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
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (user) {
        res
          .status(409)
          .json({ message: `User with email ${email} already exists` });
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const avatarURL = gravatar.url(email);
      const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL
      });
      res.status(201).json({
        user: { email: newUser.email, subscription: newUser.subscription },
      });
    } catch (error) {
      return HttpError(500, error.message);
    }
  }

  async updateSubscription(req, res) {
    try {
      const { _id } = req.user;
      const { subscription } = req.body;

      const result = await User.findByIdAndUpdate(
        _id,
        { subscription },
        { new: true }
      );

      return res.status(200).json(result);
    } catch (error) {

    }
  }

  async uploadAvatar(req,res){
    const { _id } = req.user;
    const { path: tempDirectory, originalname } = req.file;
    const fileName = `${_id}_${originalname}`;
  
    const destinationFile = path.join(avatarDir, fileName);
  
    await modifier(tempDirectory);
  
    await fs.rename(tempDirectory, destinationFile);
  
    const avatarURL = path.join("avatars", fileName);
    await User.findByIdAndUpdate(_id, { avatarURL });
  
    res.json({ avatarURL });
  }
}

module.exports = new UserController();
