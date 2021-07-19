const { contact: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await service.getById(contactId)
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
        message: 'Not Found Contact',
        data: 'Not Found'
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = getById
