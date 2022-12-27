const getCurrent = (req, res) => {
  const { email } = req.user;

  res.json({
    email,
  });
};

module.exports = getCurrent;
