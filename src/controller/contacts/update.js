const { HTTP_CODES, STATUS } = require('../../helpers/constants')

const contactServices = require('../../services')

const update = async (req, res, next) => {
  try {
    const {
      params: { contactId },
      body,
    } = req
    const data = await contactServices.updateContact(contactId, body)
    data
      ? res.status(HTTP_CODES.OK).json({
        status: STATUS.SUCCESS,
        code: HTTP_CODES.OK,
        data,
      })
      : next({
        status: HTTP_CODES.NOT_FOUND,
        code: HTTP_CODES.NOT_FOUND,
        message: 'Not found',
      })
  } catch (error) {
    next(error)
  }
}

module.exports = update