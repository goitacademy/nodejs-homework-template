const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    const error = new Error(`Email or password is wrong`);
    error.status = 401;
    throw error;
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  //   await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: 'success',
    code: 200,
    message: 'user login',
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
