const getCurrent = async (req, res) => {
  const { _id, subscription, email, avatarUrl } = req.user;
  res.json({ user: { avatarUrl, email, subscription, _id } });
};

module.exports = getCurrent;
