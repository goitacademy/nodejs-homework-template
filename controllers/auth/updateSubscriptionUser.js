const { User } = require("../../models/user");
const { HttpError } = require("../../utils");

const updateSubscriptionUser = async (req, res) => {
    const { id } = req.params;

  const result = await User.findByIdAndUpdate(id, req.body, {new:true});
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
}

module.exports = updateSubscriptionUser;