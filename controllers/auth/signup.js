const { Conflict } = require('http-errors');
const { User } = require('../../model/user');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }
  const newUser = new User({ email });
  // хешируем пароль и добавляем его новому пользователю
  newUser.setPassword(password);
  // создаем пользователю аватар
  newUser.setAvatar(email);
  // сохраняем в базе нового пользователя с хешированным паролем и аватаром
  await newUser.save();
  // await User.create({ email, password });
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
    data: {
      user: {
        email: newUser.email,
        subscription: 'starter'
      }
    }
  });
};

module.exports = signup;
