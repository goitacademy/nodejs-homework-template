const { signupUser } = require("../../service/users/");
const signupUserController = async (req, res) => {
  const { email, password } = req.body;
  await signupUser(email, password);
  res.status(201).json({ status: "success", data: { email } });
};
module.exports = signupUserController;
