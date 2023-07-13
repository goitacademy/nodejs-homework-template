const { User } = require("../models/user");
// const { HttpError, ctrlWrapper } = require("../helpers");
// const { registerSchema } = require("../models/user");
const { ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  // const { error } = registerSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, "The entered data is not valid");
  // }

  const newUser = await User.create(req.body);

  res.status(201).json({ email: newUser.email });
};

module.exports = {
  register: ctrlWrapper(register),
};
