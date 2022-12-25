const User = require("../../models/users");
const { createError } = require("../../helpers");

async function updateSubscribtionUser(req, res) {
  const { id } = req.params;
  const { _id } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(
    { _id: id, owner: _id },
    {
      subscription,
    },
    { new: true }
  );

  if (!result) {
    throw createError({ status: 404, message: "Not Found" });
  }

  res.status(200).json(result);
}

module.exports = updateSubscribtionUser;
