const { contact: service } = require('../../services');
const HTTP_STATUS = require('../../utils/httpStatusCodes');

const addContact = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await service.addContact(body);

    if (!result) {
      req.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'Error',
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'Bad request',
      });
    }

    res.status(HTTP_STATUS.CREATED).json({
      status: 'Success',
      code: HTTP_STATUS.CREATED,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;