const User = require("../../models/users");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;