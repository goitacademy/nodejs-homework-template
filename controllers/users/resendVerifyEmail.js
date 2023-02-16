const { BadRequest, NotFound } = require('http-errors');
const { User } = require('../../models/user');
const { sendEmail } = require('../../services/users');

module.exports = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw NotFound('user not found');
  if (user.verify) {
    throw BadRequest(
      'message: "Verification has already been passed"'
    );
  }

  const { BASE_URL } = process.env;
  const verifyResendEmail = {
    to: email,
    subject: 'Test to RESEND verify some email',
    html: `<a target="_blank" 
    href="${BASE_URL}/api/users/verify/${user.verificationCode}">
    Click to verify email</a>`,
  };

  await sendEmail(verifyResendEmail);
  res.json({
    Status: '200 Ok',
    message: 'Verification email sent',
  });
};
