const { HTTP_CODES, STATUS } = require('../../helpers/constants')

const contactServices = require('../../services')

const add = async (req, res, next) => {
  try {
    const data = await contactServices.addContact(req.body)
    res.status(HTTP_CODES.CREATED).json({
      status: STATUS.SUCCESS,
      code: HTTP_CODES.CREATED,
      data,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = add