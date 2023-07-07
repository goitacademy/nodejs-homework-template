const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const validSubscriptions = ["starter", "pro", "business"];

  if (!validSubscriptions.includes(subscription)) {
    throw HttpError(400, "subscription is incorrect");
  }
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Update subscription",
    data: result,
  });
};

module.exports = updateSubscription;
