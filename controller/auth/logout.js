const User = require("../../service/schemas/user/users");

const logout = async (req, res, next) => {
  try {
    const { user } = req;
    await User.updateOne({ _id: user.id }, { token: "" });
    res.status(204).json({ message: "No Content" });
  } catch (error) {
    next(error);
  }
};
module.exports = logout;
