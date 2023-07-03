const User = require("../../models/user.js");
const { HttpError } = require("../../helpers");

const getCurrent = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new HttpError(401, "Not authorized");
    }
    const userData = {
      email: user.email,
      subscription: user.subscription,
    };
    console.log(`Current user email is: ${user.email}`.success);
    res.status(200).json({ message: `Current user id is: ${id}`, userData });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
