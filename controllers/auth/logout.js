const { user: service } = require('../../services');

const logout = async (req, res, next) => {
  try {
    await service.updateUserById(req.user._id, { token: null });
    res.json({
      status: 'success',
      code: 204,
      message: 'No Content',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
