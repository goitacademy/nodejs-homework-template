const User = require("../../models/users");
const HttpError = require("../../helpers/HttpError");

const logoutUser = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new HttpError(401, "Not authorized"));
    }

    user.token = null;
    await user.save();

    res.status(204).end();
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = logoutUser;
