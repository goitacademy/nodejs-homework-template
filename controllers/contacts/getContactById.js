const { contact: service } = require('../../services');
const HTTP_STATUS = require('../../utils/httpStatusCodes');

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await service.getContactById(contactId);

    if (!result) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'id not found' });
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

module.exports = getContactById;