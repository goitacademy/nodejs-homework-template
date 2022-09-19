const { users: operations } = require("../../services");

const login = async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await operations.login(password, email);

  res.status(200).json({ user, token });
};

module.exports = login;
