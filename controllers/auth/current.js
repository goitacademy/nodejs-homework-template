const current = (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};
module.exports = current;
