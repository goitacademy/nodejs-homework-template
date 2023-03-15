const { findUserById } = require("../../services");

const currentUserCtrl = async (req, res) => {
  const { id } = req.user;

  const user = await findUserById(id);
  const { email, subscription } = user;

  return res.status(200).json({
    email: email,
    subscription: subscription,
  });
};

module.exports = currentUserCtrl;
