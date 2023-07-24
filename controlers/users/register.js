const { User } = require("../../models");
const { ctrlWrap, ApiError } = require("../../helpers");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw ApiError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(200).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

module.exports = ctrlWrap(register);
