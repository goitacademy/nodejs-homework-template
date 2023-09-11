const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { joiUserLoginSchema } = require("../../validation/users");
const User = require("../../models/users");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = joiUserLoginSchema.validate(req.body);
    const { email, password } = req.body;

    if (!email && !password) {
      res.status(400).json({ message: "missing fields" });
      return;
    } else if (!email) {
      res.status(400).json({ message: "missing field email" });
      return;
    } else if (!password) {
      res.status(400).json({ message: "missing field password" });
      return;
    }

    if (error) {
      console.log(error);
      res.status(400).json({
        message: "Bad request",
      });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "email or password is wrong",
      });
      return;
    }

    if (user.verify === false) {
      res.status(401).json({
        message: "User is not verified",
      });
      return;
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      res.status(401).json({
        message: "email or password is wrong",
      });
      return;
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
