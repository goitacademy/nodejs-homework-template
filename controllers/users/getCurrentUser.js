const User = require("../../models/users");
const HttpError = require("../../helpers/HttpError");

const getCurrentUser = async (req, res, next) => {
  const userId = req.user ? req.user._id : null;

  try {
    if (!userId) {
      return res.status(401).json({
        message: "Not Authorized!",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "Not Authorized!",
      });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
    console.error(error);
  }
};

module.exports = getCurrentUser;
