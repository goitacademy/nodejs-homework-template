const { userCurrent } = require("../../models/users");

const current = async (req, res, next) => {
  const data = await userCurrent(req.user);
  if (!data) {
    return res.status(401).json({ status: 401, message: "Not authorized" });
  }
  return res.status(200).json({ status: 200, message: "Success", data });
};

module.exports = current;
