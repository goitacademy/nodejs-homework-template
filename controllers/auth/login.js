const { Unauthorized } = require('http-errors');
const { User } = require('../../models');
const { HTTP_STATUS_CODE, STATUS } = require('../../helpers/constants.js');

const login = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (!userExist || !userExist.comparePassword(password)) {
    throw new Unauthorized(`Email or password is wrong`);
  }

  userExist.setToken();
  userExist.save();

  res.json({
    status: STATUS.SUCCESS,
    code: HTTP_STATUS_CODE.OK,
    payload: {
      token: userExist.token,
      user: {
        name: userExist.name,
        email: userExist.email,
        subscription: userExist.subscription,
      },
    },
  });
};

module.exports = login;
