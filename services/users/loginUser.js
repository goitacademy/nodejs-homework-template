const { User } = require('../../schemas/modelUser');

const loginUser = async (id, token) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { token: token },
    { new: true }
  );
};

module.exports = { loginUser };
