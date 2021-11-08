const { NotFound } = require('http-errors')
const contactsOperations = require('../../models/contacts')

const putContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactsOperations.updateContact(id, req.body)
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = putContact
