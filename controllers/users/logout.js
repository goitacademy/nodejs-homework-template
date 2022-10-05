const { User } = require("../../models");

const logout = async (req, res, next) => {
  console.log("req logout: ", req.user);
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
