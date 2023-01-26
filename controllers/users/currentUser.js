const { User } = require("../../models/user.js");
const { RequestError } = require("../../helpers/index.js");

async function currentUser(req, res, next) {
  try {
    const { _id: id } = req.user;
    const userId = await User.findById(id);
    console.log("userId", userId);
    if (!userId) {
      throw RequestError(401, "Not authorized");
    }

    res.status(200).json({
      email: userId.email,
      subscription: userId.subscription,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = { currentUser };
