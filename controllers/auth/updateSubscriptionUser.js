const { User } = require("../../models");
const { HttpError } = require("../../utils");

const updateSubscriptionUser = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id: id } = req.user;
  const user = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  ).exec();
  if (!user) {
    throw HttpError(401);
  } else {
    res.json({
      status: "success",
      code: 200,
      subscription,
    });
  }
};
module.exports = updateSubscriptionUser;
