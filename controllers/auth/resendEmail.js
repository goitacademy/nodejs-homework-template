const { User } = require("../../models/user");

const { createError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resentEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404);
  }

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">
        Click to verify your email
      </a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Email send success",
  });
};

module.exports = resentEmail;
