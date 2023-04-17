const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { controllerWrap } = require("../../utils");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPsw = await bcrypt.hash(password, 10);

  const result = await User.create({ ...req.body, password: hashPsw });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: "starter",
    },
  });
};

module.exports = {
  register: controllerWrap(register),
};
