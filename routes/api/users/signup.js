const express = require("express");
const bcrypt = require("bcrypt");
const joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const sgMail = require("@sendgrid/mail");
const User = require("../../../models/User");
const gravatar = require("gravatar");

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res, next) => {
  console.log("Request body:", req.body);

  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    console.log("Validation Error:", error);

    if (error) {
      return res.status(400).json({
        status: "400 Bad Request",
        contentType: "application/json",
        responseBody: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "409 Conflict",
        contentType: "application/json",
        responseBody: {
          message: "Email in use",
        },
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

    const verificationToken = uuidv4();

    const newUser = new User({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    const verificationLink = `${process.env.BASE_URL}/auth/verify/${verificationToken}`;

    const msg = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Verify your email",
      text: `Please verify your email by clicking the following link: ${verificationLink}`,
      html: `<p>Please verify your email by clicking the following link: <a href="${verificationLink}">${verificationLink}</a></p>`,
    };

    await sgMail.send(msg);

    await newUser.save();

    res.status(201).json({
      status: "201 Created",
      contentType: "application/json",
      responseBody: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatarURL: newUser.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
