const User = require("../../models/auth");
const RequestError = require("../../helpers/RequestError");

const verifyToken = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw RequestError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.status(200).json("Verification successful");
};

module.exports = verifyToken;
