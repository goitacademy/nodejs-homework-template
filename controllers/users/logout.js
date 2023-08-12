const { User } = require("../../models");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json({
      status: "No Content",
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
