const { User } = require("../../models");
const { createError } = require("../../helpers");

const verificationToken = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createError(404);
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });
  res.json({
    message: "Verification successful",
  });
};
module.exports = verificationToken;
