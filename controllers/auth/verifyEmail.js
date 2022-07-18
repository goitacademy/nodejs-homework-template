const { User } = require("../../models/userSchema");
const { createError } = require("../../helpers");

const verifyEmail = async (req, res, next) => {
  try {
    const verificationToken = req.params;
    const user = await User.findOne(verificationToken);
    if (!user) {
      throw createError(404, "User not found");
    }

    const result = await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });

    if (!result) {
      throw createError(499, "verificationToken error");
    }

    res.json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
