const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  //   const { subscription } = req.body;
  const { _id: owner } = req.user;

  const result = await User.findByIdAndUpdate(owner, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateSubscription;
