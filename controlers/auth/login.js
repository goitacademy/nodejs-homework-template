const { User } = require("../../models");
const { HttpError, checkingHashPassword } = require("../../utils");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid ");
  }

  const hashPassword = await checkingHashPassword(password, user.password);
  if (!hashPassword) {
    throw HttpError(401, "Email or password invalid ");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    code: 200,
    token,
    user: { email, subscription: user.subscription },
  });
};

module.exports = login;
