const { loginUser } = require("../../service/users/");
const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const data = await loginUser(email, password);
  const { token } = data;
  res.json({ status: "success", token });
};
module.exports = loginUserController;
