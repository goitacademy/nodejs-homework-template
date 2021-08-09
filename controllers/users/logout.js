const { user: service } = require('../../services');

const logout = async (req, res, next) => {
  try {
    await service.updateById(req.user._id, { token: null });
    res.json({
      status: 'success',
      code: 200,
      message: 'Logout success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
