const current = async (req, res, next) => {
  return res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};

module.exports = current;
