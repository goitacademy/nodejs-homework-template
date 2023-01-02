const { User } = require("../../models");

const logOut = async (req, res, next) => {
  try {
    const { user } = req;

    await User.findOneAndUpdate({ _id: user.id }, { token: null });
    res.status(200).json({
      message: "No Content",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logOut;
