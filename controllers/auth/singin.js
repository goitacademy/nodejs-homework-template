const { login } = require("../../services/auth");

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await login(email, password);

  res.json({
    status: "success",
    data: {
      token: user.token,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = signin;
