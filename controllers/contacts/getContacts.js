const { getListContacts } = require('../../model/contacts/index')

const getContacts = async (req, res) => {
  const { contactId } = req.params
  const contacts = await getListContacts(contactId)
  res.status(200).json({ contacts, message: 'success' })
}

module.exports = { getContacts }
