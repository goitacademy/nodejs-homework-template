const { RequestError } = require("../../helpers");
// const { currentUser } = require("../../service/users");
const currentUserController = async (req, res) => {
  if (!req.user) {
    throw RequestError(401, "Not athorized");
  }
  const { email, subscription } = req.user;

  res.json({ status: "success", user: { email, subscription } });
};
module.exports = currentUserController;
