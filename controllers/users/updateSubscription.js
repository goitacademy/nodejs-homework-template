const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { id } = req.params;
  //   console.log(_id);
  const result = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(400, "Not found");
  }

  res.json(result);
};

module.exports = {
  updateSubscription: ctrlWrapper(updateSubscription),
};
