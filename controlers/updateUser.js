const { ctrlWrapper } = require("../helpers");
const { User } = require("../models");

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription: req.body.subscription },
    { new: true }
  );

  res.json(result);
};

module.exports = ctrlWrapper(updateUser);
