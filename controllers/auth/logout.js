const { User } = require('../../models/user');

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findOneAndUpdate(_id, { token: null });
    res.status(204).json({
      message: 'Logout success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
