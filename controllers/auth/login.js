const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { wrapper, HttpError, compareResult } = require("../../helpers");
const { JWT_KEY, JWT_EXPIRESIN } = process.env;

const signToken = (id) =>
  jwt.sign({ id }, JWT_KEY, { expiresIn: JWT_EXPIRESIN });

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await compareResult(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = signToken(user._id);

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = wrapper(login);
