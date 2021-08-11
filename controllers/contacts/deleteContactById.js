const { contact: service } = require('../../services');
const HTTP_STATUS = require('../../utils/httpStatusCodes');

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.deleteContactById(contactId);

    if (!result) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        status: 'Error',
        code: HTTP_STATUS.NOT_FOUND,
        message: 'Not found',
      });
    }
    res.status(HTTP_STATUS.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContactById;