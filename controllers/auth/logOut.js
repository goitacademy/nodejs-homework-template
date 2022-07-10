const { User } = require("../../models/user");

const logOut = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

module.exports = logOut;
