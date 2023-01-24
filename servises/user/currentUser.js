const { HttpError } = require("../../helpers");
const { User } = require("../../models/modelUser");

const currentUser = async (_id) => {
  try {
    const result = await User.findById(_id);

    if (!result) {
      throw HttpError(401, "Not authorized");
    }

    return result;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  currentUser,
};

