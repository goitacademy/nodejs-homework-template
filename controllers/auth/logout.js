const { User } = require("../../models");
const { HttpError } = require("../../utils");

const logout = async (req, res, next) => {
  const { _id: id } = req.user;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { token: null },
      { new: true }
    ).exec();
    res.json({ message: "Logout success" });
    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    res.status(204).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = logout;
