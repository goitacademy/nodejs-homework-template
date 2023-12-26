const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const updateUserSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
  if (
    !subscription ||
    subscription !== "starter" &&
    subscription !== "pro" &&
    subscription !== "business"
  )
    throw HttpError(400, "Subscription must be 'starter', 'pro' or 'business'.");
    
  const updatedUser = await User.findByIdAndUpdate(_id, { subscription });

  if (!updatedUser) throw HttpError(404, "Not found");
    res.status(201).json({
        email: updatedUser.email,
        subscription: updatedUser.subscription
    });
};

module.exports = updateUserSubscription;
