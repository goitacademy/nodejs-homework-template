const { User } = require("../../models");

const updateSubscription = async (requirement, response) => {
  const { _id } = requirement.user;
  const { subscription } = requirement.body;

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  return response.status(200).json(result);
};

module.exports = updateSubscription;
