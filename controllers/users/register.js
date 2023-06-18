const { HttpError, ctrlWrapper } = require("../../helpers");
const {
  UserModel: { User },
} = require("../../models");
const {createHashPassword} = require("../../units");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const newUser = await User.create({
    ...req.body,
    password: await createHashPassword(password),
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
