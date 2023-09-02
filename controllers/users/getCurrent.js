const users = require("../../models/users.js");
const errorMessage = require("../../helpers/errorMessage.js");

const getCurrent = async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await users.findOne({ email }).exec();
    if (!user) {
      throw errorMessage(401, "Not authorized");
    }

    res.status(200).json({
      email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
