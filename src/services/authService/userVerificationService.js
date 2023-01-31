const { User } = require("../../db");
const { httpError } = require("../../helpers");

const userVerificationService = async (token) => {
  const user = await User.findOne({ verificationToken: token });
  if (!user) throw httpError(404, "User not found");

  await User.findByIdAndUpdate(user._id, {
    $set: { verificationToken: null, verify: true },
  });
};

module.exports = { userVerificationService };
