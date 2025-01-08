const express = require("express");
const joi = require("joi");
const sgMail = require("@sendgrid/mail");
const User = require("../../../models/User");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "missing required field email",
      });
    }

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.verify) {
      return res.status(400).json({
        message: "Verification has already been passed",
      });
    }

    const verificationLink = `${process.env.BASE_URL}/auth/verify/${user.verificationToken}`;

    const msg = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Verify your email",
      text: `Please verify your email by clicking the following link: ${verificationLink}`,
      html: `<p>Please verify your email by clicking the following link: <a href="${verificationLink}">${verificationLink}</a></p>`,
    };

    await sgMail.send(msg);

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
