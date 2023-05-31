const { User } = require('../../models/user');

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
    // res.status(200).json({
    //   message: 'asd',
    // });
  res.status(204);
};

module.exports = logout;
