const getCurrentUser = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

module.exports = getCurrentUser;
