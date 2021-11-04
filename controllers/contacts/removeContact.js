const { NotFound } = require('http-errors')
const { remove } = require('../../models/contacts')

const removeContact = async (req, res, next) => {
  const idNormalize = Number(req.params.contactId)
  const contact = await remove(idNormalize)
  if (contact === null) {
    throw new NotFound(`Contact with id ${idNormalize} not found`)
  }
  res.json({ message: 'Contact deleted' })
}

module.exports = removeContact
