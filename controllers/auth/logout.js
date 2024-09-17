const { User } = require("../../models/user");
const { HttpErrors } = require("../../helpers");
const logout = async (req, res, next) => {
  const { _id: id } = req.user;
  try {
    const user = await User.findByIdAndUpdate( id, { token: null },{ new: true }).exec();
    if (!user) {
      throw HttpErrors(401, "Not authorized");
    }
    res.status(204).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = logout;
