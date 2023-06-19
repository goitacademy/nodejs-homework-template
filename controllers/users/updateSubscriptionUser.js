const { httpError, ctrlWrapper } = require("../../helpers");
const {
  UserModel: { User },
} = require("../../models");

const updateSubscriptionUser = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  const result = await User.findByIdAndUpdate(id, body, { new: true });
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
};
