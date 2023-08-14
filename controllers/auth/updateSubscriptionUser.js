const { HttpErrors } = require("../../helpers");
const { User } = require("../../models/user");

const updateSubscriptionUser = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id: id } = req.user;
  const user = await User.findByIdAndUpdate(id, { subscription },{ new: true }).exec();
  if (!user) {
    throw HttpErrors(401);
  } else {
    res.json({
      status: "success",
      code: 200,
      subscription,
    });
  }
};

module.exports = updateSubscriptionUser;
