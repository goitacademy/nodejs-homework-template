const User = require("../models/schemas/users");

const userRegistration = async (req, res, next) => {
  const user = await User.create(req.body);
  console.log(user);
  res.status(200).json({ data: "success" });
};

module.exports = { userRegistration };
