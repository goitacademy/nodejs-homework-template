const { User } = require("../../models/user/user");

const { HttpError } = require("../../helpers");

const subscription = async (req, res) => {
  const { _id } = req.user;

  const { subscription } = req.body;

  if (!subscription) {
    res.status(400).json({ message: "missing field subscription" });
    return;
  }

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  subscription,
};
