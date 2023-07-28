const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updatePassword = async (req, res) => {
  const { token: restorePasswordToken, password: plainPassword } = req.body;
    const user = await User.findOne({ restorePasswordToken });

  if (!user) throw HttpError(401, "No such token");

  const password = await bcrypt.hash(plainPassword, 10);

  await User.findByIdAndUpdate(
    user._id,
    { password, restorePasswordToken: null },
    { new: true }
  );

  res.json({
    message: "Password updated",
  });
};

module.exports = ctrlWrapper(updatePassword);
