const { User } = require('../../models');
const { sendEmail } = require('../../helpers/');
const { NotFound } = require('http-errors');

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.verify) {
    throw NotFound();
  }

  const mail = {
    to: email,
    subject: 'Підтвердження email',
    html: `<a target="_blank" http://localhost:3000/api/auth/verify/${user.verificationToken}">Підтвердити email</a>`,
  };

  await sendEmail(mail);

  res.json({
    massage: 'Verification successful',
  });
};

module.exports = { resendEmail };
