const { User } = require("../../db/userModel");
const { sendEmail } = require("../../helpers/sendEmail");
const { HttpError } = require("../../helpers/index");

const reVerificationOfEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(HttpError(404, "User not found"));
    }

    if (user.verify) {
      return next(HttpError(400, "Verification has already been passed"));
    }

    await sendEmail({
      to: email,
      subject: "Please confirm your email",
      html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Confirm your email</a>`,
    });

    return res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { reVerificationOfEmail };
