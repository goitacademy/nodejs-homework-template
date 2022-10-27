const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    code: 200,
    status: "success",
    email,
    subscription,
  });
};
module.exports = getCurrentUser;
