const { User } = require("../../models/user");
const { requestError } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const result = await User.findOne({ verificationToken: verificationToken });
  if (!result) {
    throw requestError(404, "User not found");
  }

  await User.findByIdAndUpdate(result._id, {
    verificationToken: null,
    verify: true,
  });

  res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
