const getCurrentUser = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        name,
      },
    },
  });
};
module.exports = getCurrentUser;
