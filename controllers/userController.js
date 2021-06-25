const { getUser } = require('../services/userService');

async function getUserController(req, res) {
  const { _id: userId } = req.user;

  const user = await getUser(userId);

  return res.status(200).json({ user, status: 'success' });
}

module.exports = { getUserController };
