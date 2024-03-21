const { User } = require("../../models/user");
const { ctrlWrapper, HttpError } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { veryficationCode } = req.params;
  const user = await User.findOne({ veryficationCode });
  if (!user) {
    throw HttpError(401, "Email not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    veryficationCode: null,
  });
  res.json({ message: "Verification successful" });
};

module.exports = ctrlWrapper(verifyEmail);
