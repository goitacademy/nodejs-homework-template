const { contact: service } = require('../../services');
const HTTP_STATUS = require('../../utils/httpStatusCodes');

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    const result = await service.updateContactById(contactId, body);
    if (!result) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        status: 'Error',
        code: HTTP_STATUS.NOT_FOUND,
        message: 'Not found',
      });
    }
    res.status(HTTP_STATUS.SUCCESS).json({
      status: 'Success',
      code: HTTP_STATUS.SUCCESS,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;