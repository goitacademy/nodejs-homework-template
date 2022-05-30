const { User, schemas } = require('../../models/user');
const { createError, sendMail } = require('../../helpers');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const signup = async (req, res, next) => {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw createError(400, 'Email or password invalid');
    }
    const { email, password } = req.body;
    const result = await User.findOne({ email });
    if (result) {
      throw createError(409, 'Email in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    const mail = {
      to: email,
      subject: 'Подтвердждение регистрации на сайте',
      html: `<a target="_blank" 
            href="localhost:3000/api/users/verify/${verificationToken}">
                Нажмите для подтверждения email
            </a>`,
    };
    await sendMail(mail);
    res.status(201).json({
      user: {
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;