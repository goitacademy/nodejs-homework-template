const { User } = require("../../models");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.json({
    status: "success",
    code: 200,
  });
};
module.exports = verifyEmail;


 

