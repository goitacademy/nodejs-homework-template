const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models");

const verify = async (req, res) => {
  const { verifycationCode } = req.params;
  const user = await User.findOne({ verifycationCode });
  if (!user) {
    throw HttpError(401, "Not Found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verifycationCode: "",
  });

  res.json({
    message: "Email verify success",
  });
};
module.exports = { verify: ctrlWrapper(verify) };