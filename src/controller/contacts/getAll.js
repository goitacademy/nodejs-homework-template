const { HTTP_CODES, STATUS } = require('../../helpers/constants')

const contactServices = require('../../services')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id
    const data = await contactServices.getContacts(userId, req.query)
    return res.status(HTTP_CODES.OK).json({
      status: STATUS.SUCCESS,
      code: HTTP_CODES.OK,
      data,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll