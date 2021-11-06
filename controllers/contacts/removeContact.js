const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

const removeContact = async (req, res, next) => {
  const id = req.params.contactId
  const contact = await Contact.findByIdAndRemove(id)
  if (!contact) {
    throw new NotFound(`Contact with id ${id} not found`)
  }
  res.json({ message: 'Contact deleted' })
}

module.exports = removeContact
