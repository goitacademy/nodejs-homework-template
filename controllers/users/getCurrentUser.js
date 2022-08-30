const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  await res.json({
    status: "success",
    code: 200,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrentUser;
