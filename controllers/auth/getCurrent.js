const getCurrent = async (req, res, next) => {
  console.log('get current');
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

module.exports = getCurrent;
