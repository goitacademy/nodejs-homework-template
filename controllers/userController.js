const { getUser, updateSubscription } = require('../services/userService');

async function getUserController(req, res) {
  const { _id: userId } = req.user;

  const user = await getUser(userId);

  return res.status(200).json({ user, status: 'success' });
}
async function updateSubscriptionController(req, res) {
  const { _id: userId } = req.user;
  const newData = req.body;

  const changedUser = await updateSubscription(userId, newData);

  return res.status(200).json({ changedUser, status: 'success, user updated' });
}

module.exports = { getUserController, updateSubscriptionController };
