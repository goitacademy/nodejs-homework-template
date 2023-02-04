const { userSecondVerificstion } = require("../../models/users");

const secondVerification = async (req, res, next) => {
  const { email } = req.body;
  const data = await userSecondVerificstion(email);
  if (!data) {
    return res
      .status(400)
      .json({ status: 400, message: "Verification has already been passed" });
  }

  return res
    .status(200)
    .json({ status: 200, message: "Verification email sent" });
};

module.exports = secondVerification;
