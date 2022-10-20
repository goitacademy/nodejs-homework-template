const { User } = require("../../service/schemasAuth");

const { RequestError } = require("../../helpers");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.json({
    code: 200,
    status: "success",
    message: "Email verify success",
  });
};

module.exports = verify;
