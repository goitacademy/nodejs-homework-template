async function getCurrentUser(req, res) {
  const { email } = req.user;

  res.json({ email });
}

module.exports = getCurrentUser;
