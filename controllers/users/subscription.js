const { User } = require("../../models");
const {  HttpError } = require("../../helpers");

const subscription = async(req, res) => {
  const { _id } = req.user
  const { subscription } = req.body
  if (!subscription) {
    throw HttpError(404, "Missing field subscription");
  }
  if (subscription !== 'starter' && subscription !== 'pro' && subscription !== 'business') {
    throw HttpError(400, "Wrong field subscription");
  }
  const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true })
//{new: true}, метод поверне новий документ після оновлення
  if (!result) {
    throw HttpError(404, "User with id ${_id} not found");
  }

  res.status(201, "subscription update").json({
    subscription: result.subscription,
  });
}

module.exports = subscription;