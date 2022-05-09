const { NotFound } = require("http-errors");
const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!user) {
    throw NotFound(`User with id=${_id} not found`);
  }
  res.json(user);
};

module.exports = updateSubscription;
