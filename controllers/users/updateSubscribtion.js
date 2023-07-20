const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");

const updateSubscribtion = async (req, res) => {
    const { _id } = req.user;
    const { subscribtion:newSubscribtion } = req.body;
    const { email, subscribtion } = await User.findByIdAndUpdate(
      _id,
      {
        subscribtion: newSubscribtion,
      },
      { new: true }
    );
  res.json({
    email,
    subscribtion,
  });
};

module.exports = ctrlWrapper(updateSubscribtion);
