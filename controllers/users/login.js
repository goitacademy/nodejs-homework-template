const { users: usersOperations } = require("../../service");

const login = async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await usersOperations.login(password, email);

  res.status(200).json({ user, token });
};


module.exports = login;