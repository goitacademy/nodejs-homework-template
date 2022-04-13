const gravatar = require('gravatar');
const { Conflict } = require('http-errors');
const { User } = require('../../models');
const { HTTP_STATUS_CODE, STATUS } = require('../../helpers/constants.js');

const signup = async (req, res) => {
  const { name, email, password, subscription } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const avatarURL = gravatar.url(email);
  const newUser = new User({
    name,
    email,
    subscription,
    avatarURL,
  });

  newUser.setHashPassword(password);
  newUser.save();

  return res.status(HTTP_STATUS_CODE.CREATED).json({
    status: STATUS.CREATED,
    code: HTTP_STATUS_CODE.CREATED,
    payload: {
      user: {
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    },
  });
};

module.exports = signup;
