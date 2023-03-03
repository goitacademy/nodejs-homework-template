const { User } = require("../../models/user");

const userSubscription = async (req, res) => {
  const { _id } = req.user;
  const { body } = req;
  const user = await User.findByIdAndUpdate(_id, body, {
    new: true,
    runValidators: true,
  });
  res.json({
    status: "success",
    code: 200,
    data: {
      result: user,
    },
  });
};

module.exports = userSubscription;
