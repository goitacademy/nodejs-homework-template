const { contact: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')

const updateStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { body } = req

    if (!body.favorite) {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'Missing field favorite',
        data: 'Bad Request'
      })
    }
    const contact = await service.updateStatusContact(contactId, req.body)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'succes',
        code: HttpCode.OK,
        data: {
          contact
        }
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact to update',
        data: 'Not Found'
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = updateStatus
