const { User } = require("../../models");
const createError = require("http-errors");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(
    { _id: _id },
    { subscription },
    { new: true }
  );
  if (!result) {
    throw createError(404, `Product with id ${id} not found`);
  }

  res.status(200).json({
    status: "succes",
    code: 200,
    subscription,
  });
};

module.exports = updateSubscription;
