const { NotFound } = require('http-errors')
const contactsOperations = require('../../models/contacts')

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactsOperations.removeContact(id)
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      massage: 'Remove success',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = deleteContact
