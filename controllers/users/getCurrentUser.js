const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    code: 200,
    status: "OK",
    userData: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrentUser;
