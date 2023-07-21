const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const signin = async (req, res) => {
  const { email, password: plainPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, "No such user/password combination");

  const isPasswordValid = await bcrypt.compare(plainPassword, user.password);

  if (!isPasswordValid)
    throw HttpError(401, "No such user/password combination");

  const payload = {
    id: user._id,
    createdAt: user.createdAt,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  await User.findByIdAndUpdate(user._id, {token});

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      subscribtion: user.subscribtion,
    },
  });
};

module.exports = ctrlWrapper(signin);
