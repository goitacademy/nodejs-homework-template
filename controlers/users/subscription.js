const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const subscription = async (req, res, next) => {
  const result = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = subscription;
