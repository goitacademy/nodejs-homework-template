const { login } = require("../../services/authService");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await login(email, password);
  res.json({
    token: user.token,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = { loginController };
