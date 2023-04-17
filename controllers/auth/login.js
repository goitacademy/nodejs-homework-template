const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const { User } = require('../../models/user');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong');
  }
  //   if (!user) {
  //     throw new Unauthorized(`Email ${email} not found`);
  //   }
  //   const passCompare = bcrypt.compareSync(password, user.password);
  //   if (!passCompare) {
  //     throw new Unauthorized(`Invalid password`);
  //   }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
