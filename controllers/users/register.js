const { Conflict } = require('http-errors');
const { User } = require('../../models');

const register = async (req, res) => {
  const { subscription, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const result = await User.create({ subscription, email, password });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = register;
