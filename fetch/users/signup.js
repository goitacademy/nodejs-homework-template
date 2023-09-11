const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuid } = require("uuid");
const { sendEmail } = require("../../helpers");

const { joiUserSignupSchema } = require("../../validation/users");
const User = require("../../models/users");
const { EMAIL } = process.env;

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
    const verificationToken = uuid();

    const result = await User.create({ ...req.body, password: hashedPassword, avatarUrl, verificationToken, verify: true });

     const mail = {
      to: email,
      from: EMAIL,
      subject: "Email verification",
      html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Click</a>`,
    };

    await sendEmail(mail);
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarUrl: result.avatarUrl,
        verificationToken: result.verificationToken
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
