const User = require("../../models/users");
const HttpError = require("../../helpers/HttpError");

const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return next(new HttpError(404, "User not found"));
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Verification has already been passed",
      });
    }

    user.verificationToken = null;
    user.isVerified = true;
    await user.save();

    res.status(200).json({
      message: "Verification successful",
    });
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = verifyUser;
