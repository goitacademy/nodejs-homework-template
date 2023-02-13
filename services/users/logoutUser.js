const { User } = require('../../schemas/modelUser');

const logoutUser = async id => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { token: null },
    { new: true }
  );
};

module.exports = { logoutUser };
