const { login } = require("../../service/auth");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await login(email, password);

    res.status(200).json({ data });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = loginController;
