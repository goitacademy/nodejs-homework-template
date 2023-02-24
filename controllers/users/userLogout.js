const { User } = require("../../models/user");


const userLogout = async (req, res, next) => {
    try {
      const { _id } = req.user;
      await User.findByIdAndUpdate(_id, { token: "" });
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

module.exports = userLogout