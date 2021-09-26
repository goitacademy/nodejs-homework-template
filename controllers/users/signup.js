const User = require("../userRequest");
const { HttpCode } = require("../../helpers/constants");
const EmailService = require("../../services/email");
const { CreateSenderSendGrid } = require("../../services/emailSender");
require("dotenv").config();

const signup = async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email in use",
      });
    }
    const {
      subscription,
      email,
      avatarURL,
      verificationToken,
    } = await User.create(req.body);

    try {
      const emailService = new EmailService(
        process.env.NODE_ENV,
        new CreateSenderSendGrid()
      );
      await emailService.sendVerifyEmail(verificationToken, email);
    } catch (error) {
      console.log(error.message);
    }

    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      user: { email, subscription, avatarURL },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = signup;
