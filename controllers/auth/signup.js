const { Conflict } = require('http-errors');
const { User } = require('../../model/user');
const { nanoid } = require('nanoid');
const sendEmail = require('../../helpers')

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }
  const verifyToken = nanoid();
  const newUser = new User({ email, verifyToken });
  // хешируем пароль и добавляем его новому пользователю
  newUser.setPassword(password);
  // создаем пользователю аватар
  newUser.setAvatar(email);
  // добавляем  verifyToken

  // сохраняем в базе нового пользователя с хешированным паролем и аватаром
  await newUser.save();

  const mail = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `
    <a target="_blank" href="http://localhost:3000/api/users/verify/${verifyToken}">Нажмите для подтверждения email</a>`
  }

  sendEmail(mail);

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
    data: {
      user: {
        email: newUser.email,
        subscription: 'starter',
        avatarURL: newUser.avatarURL
      }
    }
  });
};

module.exports = signup;
