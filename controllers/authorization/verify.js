const { User } = require("../../models");
const { HttpErrror } = require("../../helpers");

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = User.findOne({ verificationToken });
  if (!user) {
    throw HttpErrror(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.json({
    message: "Verification successful",
  });
};

module.exports = verify;
