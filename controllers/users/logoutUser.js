const User = require("../../models/users");

async function logoutUser(req, res, next) {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({
      message: "Logout success",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = logoutUser;
