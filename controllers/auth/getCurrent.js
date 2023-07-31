const getCurrent = (req, res) => {
  const { subscription, email } = req.user;

  res.json({
    subscription,
    email,
  });
};
module.exports = getCurrent;
