const { HTTP_STATUS_CODE, STATUS } = require('../helpers/constants');

const validateBody = schema => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error.details);
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      status: STATUS.ERROR,
      code: HTTP_STATUS_CODE.BAD_REQUEST,
      message: error.message,
    });
  }
};

module.exports = validateBody;
