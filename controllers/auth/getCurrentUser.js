const getCurrentUser = async (req, res, _) => {
  const user = req.user;
  return res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = getCurrentUser;
