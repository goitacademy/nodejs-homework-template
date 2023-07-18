const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const { User } = require('../../models/user');

const { HttpError, ctrlWrapper } = require('../../helpers');

// const createHashPassword = async password => {
//   //   const salt = await bcrypt.genSalt(10);
//   const result = await bcrypt.hash(password, 10);
//   const compareResult = await bcrypt.compare(password, result);
// };

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = { register: ctrlWrapper(register) };
