const getCurrent = async (req, res) => {
  const { name, subscription } = req.user;
  res.json({
    name,
    subscription,
  });
};

module.exports = getCurrent;
