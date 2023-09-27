const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const updateStatusUser = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

module.exports = updateStatusUser;
