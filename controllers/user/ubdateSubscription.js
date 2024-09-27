const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const ubdateSubscriptaion = async (req, res) => {
  const { _id: id } = req.user;
  const body = req.body;
  console.log("body", body);

  const result = await User.findByIdAndUpdate(id, req.body, { new: true });

  if (result === null) {
    throw HttpError(404, "Not found");
  }
  res.json({
    code: 200,
    data: result,
  });
};

module.exports = ubdateSubscriptaion;
