const getCurrent = (req, res) => {
  const { email, name } = req.user;

  res.json({
    name,
    email,
  });
};

module.exports = getCurrent;
