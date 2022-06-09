const { UserModel } = require("../../models/user");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await UserModel.findByIdAndUpdate(_id, { token: null });
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
