const resendVerifyEmailJoiSchema = require("../../middlewares");
const { createError, sendMail, sgMailData } = require("../../helpers");
const { User } = require("../../models/userSchema");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = resendVerifyEmailJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "JoiError. Missing required field email");
    }

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(409, "Email not found");
    }

    if (user.verify) {
      throw createError(400, "Verification has already been passed");
    }

    await sendMail(sgMailData(user.verificationToken), next);

    res.json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
