const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const sendgridMail = require('@sendgrid/mail');
const { v4: uuidv4 } = require('uuid'); // Или const { nanoid } = require('nanoid');
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};
exports.register = async (req, res) => {
  // ... логика регистрации ...
  const verificationToken = uuidv4(); // или nanoid()
  const newUser = new User({ ...req.body, verificationToken });
  await newUser.save();

  // Отправка письма
  await sendVerificationEmail(newUser.email, verificationToken);
  res.status(201).send({ /* данные пользователя и т.д. */ });
};

async function sendVerificationEmail(email, token) {
  const verificationUrl = `http://localhost:${process.env.PORT}/users/verify/${token}`;
  const message = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: 'Verify your email',
    text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
    // html: ...
  };
  await sendgridMail.send(message);
}

module.exports = auth;
