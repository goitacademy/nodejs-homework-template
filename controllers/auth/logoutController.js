const { logout } = require("../../service/auth");

const logoutController = async (req, res) => {
  try {
    const userId = req.user._id;
    await logout(userId);
    res.status(204).json();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = logoutController;
