// const bcrypt = require("bcryptjs");
const {nanoid} = require("nanoid");
const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const restorePasswordToken = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, "No such user");

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { restorePasswordToken: nanoid() },
    { new: true }
  );

  res.json({
    token: updatedUser.restorePasswordToken,
  });
};

module.exports = ctrlWrapper(restorePasswordToken);
