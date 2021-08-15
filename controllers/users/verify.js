const { user: service } = require('../../services');
const HTTP_STATUS = require('../../utils/httpStatusCodes');
const verify = async (req, res, next) => {
  const { verifyCode } = req.params;

  try {
    const user = await service.getOne({ verifyCode });

    if (!user) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'Error',
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'User not found',
      });
    }

    await service.updateById(user._id, { verified: true, verifyCode: null });
    res.send('<h1>Your email is verified. Thank you!</h1>');
  } catch (error) {
    next(error);
  }
};

module.exports = verify;