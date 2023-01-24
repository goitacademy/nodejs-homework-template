const { User } = require("../../db/userModel");
const { HttpError } = require("../../helpers/index");

const logoutUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }
    const logoutUser = await User.findByIdAndUpdate(id, { token: null });
    console.log(logoutUser);
    return res.status(204).json(logoutUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  logoutUser,
};
