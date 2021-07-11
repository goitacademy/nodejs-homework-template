const { contacts: service } = require('../../services')

const getById = async(req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await service.getById(contactId)
    if (!contact) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contact,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getById
