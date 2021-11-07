const { User } = require('../../models');
const { Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { SECRET_KEY } = process.env;
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`Email ${email} not found`);
  }
  if (!user.verify) {
    throw new Unauthorized('Email not verify');
  }
  const isCorrentPassword = bcrypt.compareSync(password, user.password);
  if (!isCorrentPassword) {
    throw new Unauthorized('Password wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
