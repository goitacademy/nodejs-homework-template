const { HttpError } = require("../../helpers/error");
const { User } = require("../../models/modelUser");

const logOut = async (_id) => {
  try {
    const result = await User.findByIdAndUpdate(_id, { token: null });

    if (!result) {
      throw HttpError(401, "Not authorized");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  logOut,
};
