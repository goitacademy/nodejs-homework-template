const jwt = require('jsonwebtoken');
const { user: service } = require('../../services');
const HTTP_STATUS = require('../../utils/httpStatusCodes');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.getOne({ email });
    if (!user || !user.validatePassword(password)) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: 'Error',
        code: HTTP_STATUS.UNAUTHORIZED,
        message: 'Email or password is wrong',
      });
    }
    if (!user.verified) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        status: 'Error',
        code: HTTP_STATUS.CONFLICT,
        message: 'User email is not verified. Please check your email',
      });
    }

    const { SECRET } = process.env;
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET);

    await service.updateById(payload.id, { token });

    res.status(HTTP_STATUS.SUCCESS).json({
      status: 'Success',
      code: HTTP_STATUS.SUCCESS,
      data: {
        token,
        user: { email: user.email, subscription: user.subscription },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;