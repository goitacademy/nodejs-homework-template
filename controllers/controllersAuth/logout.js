const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

// const { HttpError } = require("../../helpers");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json({ message: "No Content" });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
