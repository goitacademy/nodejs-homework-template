const { Contact } = require('../../models/contact')
const { NotFound } = require('http-errors')

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Contact deleted'
  })
}

module.exports = deleteContact
