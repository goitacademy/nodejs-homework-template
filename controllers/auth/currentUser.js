async function currentUser(req, res) {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
}

module.exports = currentUser;
