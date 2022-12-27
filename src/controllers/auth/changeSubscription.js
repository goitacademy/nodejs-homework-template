const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const changeSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.query;

  const result = await User.findByIdAndUpdate(_id, { subscription });
  if (!result) {
    throw new NotFound(`User not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      subscription: result.subscription,
    },
  });
};
module.exports = changeSubscription;
