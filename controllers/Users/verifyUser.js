const { usersModel } = require("../../models/users");
const { HttpError } = require("../../Helpers");
const verifyUser = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await usersModel.findOne({ verificationCode: verificationCode });
  if (!user) {
    throw HttpError(400, "User not found");
  }
  await usersModel.findByIdAndUpdate(user.id, {
    verificationCode: "",
    verify: true,
  });

  res.json({
    message: "User verify successfully",
  });
};

module.exports = verifyUser;
