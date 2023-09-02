const users = require("../../models/users.js");
const errorMessage = require("../../helpers/errorMessage.js");

const logOut = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await users.findByIdAndUpdate(_id, { token: "" }).exec();
    if (!user) {
      throw errorMessage(401, "Not authorized");
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = logOut;
