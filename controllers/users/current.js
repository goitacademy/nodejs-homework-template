require("dotenv").config();
const User = require("../../models/users");

async function current(req, res, next) {
  try {
    const doc = await User.findById(req.user.id).exec();

    if (doc === null) {
      return res.status(404).json({ message: "User not found" });
    }

    if (doc.id !== req.user.id) {
      return res.status(404).json({ message: "Contact not found" });
    }
    const { email, subscription } = doc;
    return res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
}
module.exports = { current };
