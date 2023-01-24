const { HttpError } = require("../../helpers/index");

const currentUser = async (req, res, next) => {
  try {
    const { user } = req;

    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }
    const { email, subscription } = user;
    return res.status(200).json({
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  currentUser,
};
