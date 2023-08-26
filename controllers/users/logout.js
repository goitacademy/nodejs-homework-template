require("dotenv").config();
const User = require("../../models/users");

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = { logout };
