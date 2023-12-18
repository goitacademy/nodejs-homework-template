const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, `Email ${email} is already in use`);
  const hashPassword = bcrypt.hashSync(password, 8);

  const createdUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(200).json({
    user: {
      email: createdUser.email,
      subscription: createdUser.subscription,
    },
  });
};

module.exports = register;
