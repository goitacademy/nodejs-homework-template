const User = require("../../models/users");
const { ctrlWrapper } = require("../../helpers");

async function verify(req, res, next) {
  const { token } = req.params;
  const user = await User.findOne({ verificationToken: token }).exec();
  if (user === null) {
    return res.status(404).send({ message: "User not found" });
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.send({ message: "Verification successful" });
}

module.exports = { verify: ctrlWrapper(verify) };
