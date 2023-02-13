const { User } = require('../../schemas/modelUser');

const loginUser = async email => {
  return await User.findOne({ email });
};

module.exports = { loginUser };
