// controllers/users/updateSubscription.js
import User from "#models/users.js";

async function updateSubscription(req, res) {
  try {
    const { subscription } = req.body;
    const { user } = req;

    if (
      !subscription ||
      !["starter", "pro", "business"].includes(subscription)
    ) {
      return res.status(400).json({ message: "Invalid subscription value" });
    }

    user.subscription = subscription;
    await user.save();

    return res.status(200).json({
      message: "Subscription updated successfully",
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `An error occurred: ${err.message}` });
  }
}

export { updateSubscription };
