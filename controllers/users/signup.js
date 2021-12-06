const { User } = require('../../models');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const userFind = await User.findOne({ email });

  if (userFind) {
    const error = new Error(`Email ${email} in use`);
    error.status = 409;
    throw error;
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'user created',
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = signup;
