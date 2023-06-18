const bcrypt = require("bcrypt");
const { HttpError, ctrlWrapper } = require("../../helpers");
const {
  UserModel: { User },
} = require("../../models");
const { tokenFunc } = require("../../units");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = await tokenFunc(user._id);
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  login: ctrlWrapper(login),
};
