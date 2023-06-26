const getCurrent = async (req, res) => {
  console.log("req.user", req.user);
  const { email, subscription } = req.user;
  res.status(200).json({
    email: email,
    subscription: subscription,
  });
};

module.exports = getCurrent;
