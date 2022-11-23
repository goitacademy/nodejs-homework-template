const currentUser = async (req, res) => {
  const user = req.user;
  res.json({
    email: user.email,
    subscription: user.subscription
  });
};
module.exports = currentUser;
