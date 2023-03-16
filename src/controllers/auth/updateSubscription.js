const { User } = require("../../models");
const { BadRequest, NotFound } = require("http-errors");

const updateSubscription = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;
  if (!subscription) {
    throw new BadRequest("missing field subscription");
  }
  const updatedSubscription = await User.findByIdAndUpdate(
    _id,
    {
      subscription,
    },
    {
      new: true,
    }
  );
  if (!updatedSubscription) {
    throw new NotFound(`Erro update Subscription user with email=${email}`);
  }
  res.status(200).json({
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = { updateSubscription };
