const express = require("express");
const { BadRequest, Conflict, Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const { User } = require("../../models");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");
const { sendEmail } = require("../../helpers");

const router = express.Router();

const { SECRET_KEY, SITE_NAME } = process.env;

router.post("/register", async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const verificationToken = nanoid();
    const newUser = await User.create({
      name,
      email,
      verificationToken,
      password: hashPassword,
    });
    const data = {
      to: email,
      subject: "Confirm your email",
      html: `<p>Thank you for joining our service.</p>
            <hr/>
            <p>Click here to verify your email address</p>
            <a target="_blank" href="http://${SITE_NAME}/api/users/verify/${verificationToken}"></a>`,
    };

    await sendEmail(data);

    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }
    if (!user.verify) {
      throw new Unauthorized("Email not verify");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new Unauthorized("Email or password is wrong");
    }
    const { _id, name } = user;
    const payload = {
      id: _id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(_id, { token });
    res.json({
      token,
      user: {
        email,
        name,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
