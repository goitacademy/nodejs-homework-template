const Joi = require('joi');
require('dotenv').config();
const { BASE_URL } = process.env;
const user = require('../../models/user');
const { HttpError, sendEmail } = require('../../helpers');

const resendVerifySchema = Joi.object({
  email: Joi.string().required(),
});

const resendVerify = async (req, res) => {
  const { error } = resendVerifySchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { email } = req.body;
  const findUser = await user.findOne({ email });

  if (!findUser || findUser.verify) {
    throw HttpError(404);
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify Email Address',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${findUser.verificationCode}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: 'Verify resend' });
};

module.exports = resendVerify;
