const listCurrent = async (req, res) => {
  const { name, email, subscription } = req.user;
  res.json({
    name,
    email,
    subscription,
  });
};

module.exports = listCurrent;
