const { contact: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')

const add = async (req, res, next) => {
  try {
    const contact = await service.add(req.body)
    res.status(HttpCode.CREATED).json({
      status: 'succes',
      code: HttpCode.CREATED,
      data: {
        contact
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = add
