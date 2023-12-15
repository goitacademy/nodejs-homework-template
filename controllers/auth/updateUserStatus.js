const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;
  const response = await User.findByIdAndUpdate(id, req.body, {
    new: subscription,
  });

  if (!response) throw HttpError(404, "Not found");

  res.status(200).json({
    code: 200,
    status: "Subscription updated",
    data: response,
  });
};

module.exports = updateUserStatus;
