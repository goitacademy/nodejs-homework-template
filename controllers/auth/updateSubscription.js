const { User } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const subscriptionList = ["starter", "pro", "business"];

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  if (subscriptionList.includes(subscription)) {
    await User.findByIdAndUpdate({ _id }, { subscription });

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        subscription,
      },
    });

    throw HttpError(400, {
      status: "error",
      code: 400,
      message: "Bad request",
    });
  }
};

module.exports = { updateSubscription: ctrlWrapper(updateSubscription) };
