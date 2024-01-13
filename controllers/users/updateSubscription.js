const { HttpError } = require("../../helpers");
const { User } = require("../../models/user.js");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (
    !subscription ||
    subscription !== "starter" &&
      subscription !== "pro" &&
      subscription !== "business"
  ) throw HttpError(400, "missing field subscription");

  const updateStatusUser= await User.findByIdAndUpdate(_id, {subscription});
  if (!updateStatusUser) throw HttpError(404, "Not found");

  res.status(201).json({ 
    email: updateStatusUser.email, 
    subscription: updateStatusUser.subscription,
   });
};

module.exports = updateSubscription;