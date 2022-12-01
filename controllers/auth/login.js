const bcrypt = require('bcryptjs');
const { HTTPError } = require('../../helpers');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //* user authentication
  if (!user) {
    throw HTTPError(401, 'Email or password is wrong');
  }

  //* check user password
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HTTPError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  // try {
  //   const { id } = jwt.verify(token, SECRET_KEY);
  //   console.log(11111, id);
  // } catch (error) {
  //   console.log(error.message);
  // }
  // FIXME add logic
  // TODO add access and refresh token
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
