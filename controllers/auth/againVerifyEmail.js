const { BadRequest } = require("http-errors");
const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers");

const againVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw BadRequest("Missing required field email");
  }
  const user = await User.findOne({ email });

  if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Welcome again to PhoneBook! Confirm Your Email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm Email</a>`,
  };
  await sendEmail(mail);

  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = againVerifyEmail;
