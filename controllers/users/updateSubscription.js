const { User } = require("../../models/user");
const { BadRequest } = require("http-errors");

async function updateSubscription(req, res) {
  const { id } = req.user;
  const result = await User.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!result) {
    throw new BadRequest("missing fields");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
}

module.exports = updateSubscription;
