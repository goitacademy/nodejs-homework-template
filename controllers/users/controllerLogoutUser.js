const { logoutUser } = require('../../services/users');

const controllerLogoutUser = async (req, res) => {
  try {
    const { _id } = req.user;
    await logoutUser(_id);
    res.status(204).json({ message: 'No Content' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { controllerLogoutUser };
