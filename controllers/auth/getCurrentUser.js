const getCurrentUser = (req, res, next) => {
  const { subscription, email } = req.user;

  res.json({
    status: "success",
    code: 200,
    data: {
      email: email,
      subscription: subscription,
    },
  });
};

module.exports = getCurrentUser;
