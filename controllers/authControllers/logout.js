const { User } = require('../../models/auth');

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });
    res.status(200).json({ message: 'No Content' });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
