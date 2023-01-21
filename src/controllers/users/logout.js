const { User } = require("../../schemas/user");

async function logout(req, res, next) {
  const owrenId = req.user.id;

  const storedUser = await User.findById(owrenId);
  if (!storedUser) {
    return res.status(401).json({ message: "User not found" });
  }

  storedUser.token = null;
  try {
    const updateUser = await storedUser.save();
    console.log("logoutUser", updateUser);
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: error.message });
  }

  return res.status(204).json();
}

module.exports = logout;
