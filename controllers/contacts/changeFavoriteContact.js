const { updateStatusContact } = require('../../model/contacts/index')

const changeFavoriteContact = async (req, res, next) => {
  const body = req.body
  const id = req.params.contactId
  if (!body) {
    return res.status(400).json({ message: 'missing field favorite' })
  }
  const updateContact = await updateStatusContact(id, body)
  res.status(200).json({ updateContact, message: 'success' })
}

module.exports = { changeFavoriteContact }
