const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;
const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);

  if (!user || !passCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '48h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    },
  });
};
module.exports = login;