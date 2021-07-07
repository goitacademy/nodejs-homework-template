const { updateContact } = require('../../model/index')
const { HttpCode } = require('../../helpers/constants')

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await updateContact(contactId, req.body)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'succes',
        code: HttpCode.OK,
        data: {
          contact,
        },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact to update',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = update
