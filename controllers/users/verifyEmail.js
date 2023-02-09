const { User } = require("../../models/user.js");
const { RequestError } = require("../../helpers/index.js");

async function verifyEmail(req, res, next) {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw RequestError(404, "User not found");
    }

    await User.findByIdAndUpdate(
      user._id,
      {
        verify: true,
        verificationToken: null,
      },
      { new: true }
    );
    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
}

module.exports = { verifyEmail };
