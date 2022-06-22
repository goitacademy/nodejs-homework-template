const contacts = require('../../services/contacts')

const getContacts = async (req, res) => {
  const result = await contacts.listContacts()
  res.json(result)
}

module.exports = getContacts
