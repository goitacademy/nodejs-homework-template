const { User } = require("../../db/usersModel");
const { userLogOut } = require("../../models/users");

const logOut = async (req, res, next) => {
  const { _id } = req.user;
  const data = await userLogOut(_id);
  if (!data) {
    return res.status(401).json({ status: 401, message: "Not authorized" });
  }
  return res.status(204).json();
};

module.exports = logOut;
