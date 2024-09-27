const User = require("../../models/users");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    if (user.verify) {
      res.status(400).json({ message: "Verification has already been passed" });
      return;
    }

    const verifyEmail = {
      to: email,
      from: EMAIL,
      subject: "Verify email",
      html: `<a target="_blank" href="http://localhost:3000/users/verify/${user.verificationToken}">Click</a>`,
    };

    sgMail.send(verifyEmail).then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );

    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;