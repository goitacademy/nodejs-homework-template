const { User } = require("../../model/user");
const requestError = require("../../helpers/requestError");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw requestError(404, "User is not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    code: 200,
    status: success,
    message: "Email is successfully verified",
  });
};

module.exports = verify;
