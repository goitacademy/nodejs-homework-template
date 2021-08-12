const { user: service } = require('../../services');
const HTTP_STATUS = require('../../utils/httpStatusCodes');

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.getOne({ email });

    if (user) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        status: 'Error',
        code: HTTP_STATUS.CONFLICT,
        message: 'Email is already in use',
        data: 'Conflict',
      });
    }
    const newUser = await service.addUser({ email, password });
    const { subscription } = newUser;
    res.status(HTTP_STATUS.CREATED).json({
      status: 'Success',
      code: HTTP_STATUS.CREATED,
      data: {
        user: { email, subscription },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;