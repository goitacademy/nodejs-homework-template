const { createError } = require("../../helpers");
const { User } = require("../../models/user");

const resendVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }
};

module.exports = resendVerification;
