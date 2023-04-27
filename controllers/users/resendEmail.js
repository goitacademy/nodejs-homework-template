const { User } = require('../../models');
const { BadRequest } = require('http-errors');
const sendEmail = require('../../helpers');

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }
  const { verificationToken } = user;
  const mail = {
    to: email,
    subject: 'Verification email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verify email please</a>`,
  };
  await sendEmail(mail);
  res.status(200).json({
    message: 'Verification email sent',
  });
};

module.exports = resendEmail;
