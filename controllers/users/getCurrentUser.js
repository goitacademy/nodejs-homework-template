const { getCurrentUser } = require("../../services/users");

const getUser = async (req, res) => {
  const { id } = req.user;

  const user = await getCurrentUser(id);
  res.json({
    status: "success",
    data: { email: user.email, subscription: user.subscription },
  });
};

module.exports = getUser;
