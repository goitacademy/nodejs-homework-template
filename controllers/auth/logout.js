const userService = require('../../services/auth');

const logout = async (req, res, next) => {
  try {
    await userService.updateById(req.user._id, { token: null });
    res.status(200).json({
      status: 'succsess',
      code: 204,
      message: 'No content',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
