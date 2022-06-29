const { User } = require("../../models");
const createError = require("http-errors");
const { sendEmail } = require("../../helpers");

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, "User not found");
    }
    const { verificationToken } = user;
    const mail = {
      to: email,
      subject: " Verify your email",
      html: `<a target="_blank" href="http://localhost:3000/api/v1/users/verify/${verificationToken}">Verify email</a>`,
    };
    res.status(200).json({
      code: 200,
      message: "We send you email",
    });
    await sendEmail(mail);
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;
