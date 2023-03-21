const { User } = require('../../models');

const { BadRequest } = require('http-errors');

const { nanoid } = require('nanoid');

const { sendEmail } = require('../../helpers');

const verify = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest('missing required field email');
  }

  const user = await User.findOne({ email });

  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }

  const verificationToken = nanoid();

  await User.findByIdAndUpdate(user._id, { verificationToken });

  const mail = {
    to: email,
    subject: 'Confirmation Email',
    html: `<a target ="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm Email</a>`,
  };

  await sendEmail(mail);

  res.json({ message: 'Verification email sent' });
};

module.exports = verify;