const User = require("../../models/users");
const { ctrlWrapper } = require("../../helpers");

async function verifyRepeated(req, res, next) {
  const { email } = req.body;
  const { token } = req.params;
  if (!email) {
    return res.status(400).send({ message: "missing required field email" });
  }

  const user = await User.findOne({ verificationToken: token }).exec();
  if (user === null) {
    return res.status(404).send({ message: "User not found" });
  }
  const userVerify = await User.findOne(user._id);
  if (userVerify.verify) {
    return res
      .status(400)
      .send({ message: "Verification has already been passed" });
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.send({ message: "Verification successful" });
}

module.exports = { verifyRepeated: ctrlWrapper(verifyRepeated) };
