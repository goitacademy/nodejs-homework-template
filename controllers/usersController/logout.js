const { User } = require('../../models');

async function logoutUser(req, res, next) {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json({
      status: 'success',
      code: 204,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = logoutUser;
