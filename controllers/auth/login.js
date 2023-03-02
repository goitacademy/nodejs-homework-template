const { User } = require("../../models/user");

const { createToken } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const pass = await user?.verifyPassword(password);
  if (!user || !pass) {
    const error = new Error("Email or password is incorrect");
    error.status = 401;
    throw error;
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
      token,
    },
  });
};

module.exports = login;
