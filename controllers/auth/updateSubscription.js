const { User } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate({ _id }, { subscription });

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      subscription,
    },
  });
};

module.exports = { updateSubscription: ctrlWrapper(updateSubscription) };
