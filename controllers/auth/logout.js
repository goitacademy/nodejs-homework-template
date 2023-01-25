const bcrypt = require("bcrypt");
const { httpError } = require("../../helpers");
const { User } = require("../../models/users");

async function logout(req, res, next) {
  try {
    const { _id } = req.user;
    const user = await User.findOne({ _id });

    if (!user) {
      throw new httpError(401, "Not authorized");
    }

    const logoutUser = await User.findByIdAndUpdate(_id, { token: null });

    return res.status(204).json(logoutUser);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  logout,
};
