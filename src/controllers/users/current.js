const { User } = require("../../schemas/user");

async function current(req, res, next) {
  const owrenId = req.user.id;

  const storedUser = await User.findById(owrenId).select({
    email: 1,
    subscription: 1,
    _id: 0,
  });
  if (!storedUser) {
    return res.status(401).json({ message: "User not found" });
  }

  return res.status(200).json(storedUser);
}

module.exports = current;
