const { User } = require("../../model/user");
const requestError = require("../../helpers/requestError");
const createVerifyEmail = require("../../helpers/createVerifyEmail");
const sendEmail = require("../../helpers/sendEmail");

const resendVerify = async (req, res) => {
  const email = req.body;
  const user = User.findOne({ email });

  if (!user) {
    throw requestError(400, "User is not found");
  }

  if (user.verify || user.verificationToken === "") {
    throw requestError(400, "Verification has already been passed");
  }

  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);

  res.json({
    code: 200,
    status: "success",
    message: "Verification is successful",
  });
};

module.exports = resendVerify;
