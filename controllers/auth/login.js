const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { User } = require('../../model/user');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong');
  };
  const payload = {
    id: user._id
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: 'succsess',
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription
      }
    }
  });
};

module.exports = login;
