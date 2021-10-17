const { changeContact } = require('../../model/contacts/index')

const updateContact = async (req, res, next) => {
  const body = req.body
  const id = req.params.contactId
  if (!body.name && !body.number) {
    return res.status(404).json({ message: 'missing fields' })
  }
  await changeContact(id, body)
  res.status(200).json({ message: 'success' })
}

module.exports = { updateContact }
