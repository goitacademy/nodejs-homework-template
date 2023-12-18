const User = require("../../models/users");
const sendVerificationEmail = require("../../helpers/sendEmail");
const HttpError = require("../../helpers/HttpError");

const resendEmailVerification = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new HttpError(400, "Missing required field email"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new HttpError(404, "User not found"));
    }

    if (user.verify) {
      return next(new HttpError(400, "Verification has already been passed"));
    }

    await sendVerificationEmail(email, user.verificationToken);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = resendEmailVerification;
