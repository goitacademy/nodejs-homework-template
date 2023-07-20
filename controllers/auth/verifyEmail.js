const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.query;
  console.log(verificationCode);
  const user = User.findByOne({ verificationCode });
  if (!user) {
    console.log("not знайшов");
  }
  res.json({
    message: "Verification email success",
  });
};

module.exports = verifyEmail;
