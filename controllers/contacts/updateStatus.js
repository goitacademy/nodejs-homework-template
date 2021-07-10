const { contacts: service } = require('../../services')

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params
  const { body } = req
  try {
    if (!body) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Missing field favorite'
      })
    }
    const result = await service.updateStatus(contactId, body)
    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
      })
    }
    return res.json({
      status: 'success',
      code: 200,
      data: {
        result
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateStatus
