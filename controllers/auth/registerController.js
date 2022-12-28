const { register } = require("../../service/auth");

const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await register(email, password);

    res.status(201).json({ user: data });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = registerController;
