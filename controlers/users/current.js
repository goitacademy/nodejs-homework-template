const current = async (req, res, next) => {
  const { email, name, avatarURL, subscription } = req.user;
  res.json({
    email,
    name,
    avatarURL,
    subscription,
  });
};

module.exports = current;
