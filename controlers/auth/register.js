const { User } = require("../../models");
const { HttpError, createHashPassword } = require("../../utils");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await createHashPassword(password);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    code: 201,
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

module.exports = register;
