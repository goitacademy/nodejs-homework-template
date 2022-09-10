const { registration } = require("../services/registrationService");
const { User } = require("../db/userModel");

const registrationController = async (req, res) => {
  const { username, password } = req.body;
  if (await User.findOne({ username: username })) {
    return res.status(401).json({
      message: "duplicate",
      description: "Not successful, such user already exists",
    });
  }
  const user = await registration(username, password);
  res.json({ message: "success", description: "success" });
};
module.exports = {
  registrationController,
};
