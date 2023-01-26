const { User } = require("../../models/user.js");
const { RequestError } = require("../../helpers/index.js");

async function logout(req, res, next) {
  try {
    const { _id: id } = req.user;
    const userId = await User.findById(id);
    if (!userId) {
      throw RequestError(401, "Not authorized");
    }
    await User.findByIdAndUpdate(id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
}
module.exports = { logout };
