const getCurrentUser = async (req, res) => {
  const { email, name } = req.user;

  res.json({ email, name });
};

module.exports = getCurrentUser;
