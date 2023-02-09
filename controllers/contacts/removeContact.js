const contacts = require('../../models/contacts')

const RequestError = require('../../helpers/requestError')

const removeContact = async (req, res) => {
  const { id } = req.params
  const result = await contacts.removeContact(id)
  if (!result) {
    throw RequestError(404, 'Not found')
  }
  res.json({
    message: 'Contact deleted',
  })
}

module.exports = removeContact
