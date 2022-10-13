const { RequestError } = require("../../helpers");
const {User} = require("../../models")

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const newSubscription = req.body.subscription;
  const subscriptionTypes = User.schema.path("subscription").enumValues;

  if (!subscriptionTypes.includes(newSubscription)) {
    throw RequestError(400, "Such a subscription does not exist")
  }

  await User.findByIdAndUpdate(_id, { subscription: newSubscription })
  res.status(200).json({
    message: `Your subscription updated to ${newSubscription}`
  })
}

module.exports = updateSubscription;