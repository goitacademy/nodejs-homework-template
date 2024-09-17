const { HTTP_CODES, STATUS } = require('../../helpers/contacts');
const contactServices = require('../../services');

const getAll = async (req, res, next) => {
  try {
    const data = await contactServices.listContacts()
    res.status(HTTP_CODES.OK).json({
      status: STATUS.SUCCESS,
      code: HTTP_CODES.OK,
      data,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll