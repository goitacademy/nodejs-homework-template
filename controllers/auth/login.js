const { User } = require("../../models/user");

const { createToken, customError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const pass = await user?.verifyPassword(password);
  if (!user || !pass || !user.verify) {
    throw customError("Email or password is incorrect or not verified", 401);
  }

  const payload = {
    id: user._id,
  };

  const token = createToken(payload);
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    response: "success",
    status: 200,
    data: {
      user: {
        name: user.name,
        email,
        avatarURL: user.avatarURL,
        subscription: user.subscription,
      },
      token,
    },
  });
};

module.exports = login;
