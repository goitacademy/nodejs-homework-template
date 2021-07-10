const { contacts: service } = require('../../services')

const removeContact = async(req, res, next) => {
  const { contactId } = req.params
  try {
    const result = await service.del(contactId)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact
