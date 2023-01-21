const { User } = require("../../schemas/user");
const { schemaSubscription } = require("../../schemas/validation");

async function subscription(req, res, next) {
  const userId = req.user.id;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing field subscription" });
  }

  const validationResult = schemaSubscription.validate(body);
  if (validationResult.error) {
    return res.status(400).json({ message: "invalid value content" });
  }

  try {
    const storedUser = await User.findOneAndUpdate({ _id: userId }, body, {
      new: true,
    }).select({
      email: 1,
      subscription: 1,
      _id: 0,
    });
    return res.status(200).json(storedUser);
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = subscription;
