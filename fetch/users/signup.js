const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { joiUserSignupSchema } = require("../../validation/users");
const User = require("../../models/users");

const signup = async (req, res, next) => {
  try {
    const { error } = joiUserSignupSchema.validate(req.body);
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

    if (user) {
      res.status(409).json({
        message: "Email in use",
      });
      return;
    }

    const avatarUrl = gravatar.url(email);
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const result = await User.create({ ...req.body, password: hashedPassword, avatarUrl });
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarUrl: result.avatarUrl
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
