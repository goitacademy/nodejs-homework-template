const { User } = require('../../models/');
const { BadRequest } = require('http-errors');
const { sendEmail } = require('../../helpers');

const repeatedSendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const { verify, verificationToken } = user;

  if (!user) {
    throw new BadRequest('missing required field email');
  }

  if (verify) {
    throw new BadRequest('Verification has already been passed');
  }
  const mail = {
    to: 'alsteua@gmail.com',
    subject: 'подтверждение email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: 'Verification email sent',
  });
};

module.exports = repeatedSendEmail;
