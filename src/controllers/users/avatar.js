const { userAvatar } = require("../../models/users");

const avatar = async (req, res, next) => {
  const data = await userAvatar(req);
  if (!data) {
    return res.status(400).json({ status: 400, message: "Error, try again" });
  }

  return res.status(200).json({ status: 200, data });
};

module.exports = avatar;
