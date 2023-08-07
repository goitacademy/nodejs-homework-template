const { ctrlWrapper } = require("../../helpers");

const { User } = require("../../models");

const updateStatusUser = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.status(201).json(result);
};

module.exports = { updateStatusUser: ctrlWrapper(updateStatusUser) };