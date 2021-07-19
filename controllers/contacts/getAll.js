const { contact: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')

const getAll = async (req, res, next) => {
  try {
    const contacts = await service.getAll()
    res.status(HttpCode.OK).json({
      status: 'succes',
      code: HttpCode.OK,
      data: {
        contacts
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
