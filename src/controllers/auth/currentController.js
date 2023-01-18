const { currentUser } = require("../../services/authService");

const currentController = async (req, res) => {
  const { _id } = req.user;
  const user = await currentUser(_id);
  res.json({ email: user.email, subscription: user.subscription });
};

module.exports = { currentController };
