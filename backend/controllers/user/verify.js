const HttpError = require("../../helpers/httpError");
const { User } = require("../../models/userModel");


const verifyToken = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json(200, { message: 'Verification successful' });
};

module.exports = verifyToken;