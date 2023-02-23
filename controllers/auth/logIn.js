const { User } = require('../../models');
const { HttpError } = require('../../helpers');
const HttpSuccess = require('../../helpers/HttpSuccess');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw HttpError({
      status: 401,
      message: 'Unauthorized. Email or password is wrong',
    });
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json(
    HttpSuccess({
      data: { user: { email, subscription: user.subscription }, token },
    })
  );
};
module.exports = logIn;
