const getCurrentUser = async (req, res) => {
  const { email, subscription } = await req.user;

  res.json({ email, subscription });
};

module.exports = getCurrentUser;
