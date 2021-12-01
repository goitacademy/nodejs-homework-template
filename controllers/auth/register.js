const bcrypt = require('bcryptjs');
const { Conflict } = require('http-errors');
const { auth } = require('../../model');
const { User } = auth;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw new Conflict(email);

  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = { email, password: hashedPassword };
  const result = await User.create(newUser);

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Registration is successful',
  });
};

module.exports = register;
