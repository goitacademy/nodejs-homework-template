const { HttpError, sendEmail } = require('../../helpers');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { BASE_URL } = process.env;
const gravatar = require('gravatar');
const user = require('../../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const requestBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const registration = async (req, res) => {
  const { error } = requestBodySchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { email, password } = req.body;
  const findUser = await user.findOne({ email });
  if (findUser) {
    throw HttpError(409, 'Email in used');
  }

  const verificationCode = uuidv4().slice(0, 6).toUpperCase();

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await user.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: 'Verify Email Address',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    avatar: newUser.avatarURL,
  });
};

module.exports = registration;
