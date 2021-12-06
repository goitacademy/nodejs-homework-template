const { register } = require("../../services/auth");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const newUser = await register(email, password);

  return res.json({ status: "succes", code: 201, data: newUser });
};

module.exports = signup;
