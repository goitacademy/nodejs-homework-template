const getCurrent = async (req, res) => {
  const { _id, email, subscription } = req.user;

  res.json({
    _id,
    email,
    subscription,
  });
};

module.exports = getCurrent;
