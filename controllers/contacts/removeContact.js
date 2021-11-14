const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove(contactId)
  if (!result) {
    throw new NotFound(`Contact with id: ${contactId} is not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted'
  })
}

module.exports = removeContact
