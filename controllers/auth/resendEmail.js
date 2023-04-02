const { User } = require("../../models/userAuth");

const { RequestError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });

  if (!user) {
    throw RequestError(404, "emaill");
  }

  const mail = {
    to: email,
    subject: "Hi, please confirm your registration",
    form: "egorrskib@gmail.com",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to ferify email</a>`,
  };

  await sendEmail(mail);

  console.log(sendEmail(mail));

  res.json({
    message: "Email send succes",
  });
};

module.exports = resendEmail;
