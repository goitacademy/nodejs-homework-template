const { register } = require("../../services/authService");

const registerController = async (req, res) => {
  const { email, password } = req.body;
  const user = await register(email, password);
  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = { registerController };
