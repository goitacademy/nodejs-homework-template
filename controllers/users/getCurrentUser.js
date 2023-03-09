async function getCurrentUser(req, res) {
  const { email, subscription, avatarURL } = req.user;
  res.json({
    email,
    subscription,
    avatarURL,
  });
}

module.exports = getCurrentUser;
