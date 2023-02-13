const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const validPassword = user.comparePassword(password);

  if (!user || !validPassword)
    throw new Unauthorized("Email or password is wrong");

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = loginUserController;
