const User = require("../userRequest");
const { HttpCode } = require("../../helpers/constants");
const EmailService = require("../../services/email");
const { CreateSenderNodemailer } = require("../../services/emailSender");
require("dotenv").config();

const repeatEmailVerifitation = async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email);
    console.log(user);
    if (user) {
      const { email, verify, verificationToken } = user;
      if (!verify) {
        const emailService = new EmailService(
          process.env.NODE_ENV,
          new CreateSenderNodemailer()
        );
        await emailService.sendVerifyEmail(verificationToken, email);
        return res.json({
          status: "success",
          code: 200,
          data: { message: "Verification email sent" },
        });
      }
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "Verification has already been passed",
      });
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "missing required field email",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = repeatEmailVerifitation;
