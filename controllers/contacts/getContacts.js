const { getListContacts } = require('../../model/contacts/index')

const getContacts = async (req, res) => {
  const { _id } = req.user
  const { page = 1, limit = 20 } = req.query
  const contacts = await getListContacts({ _id, page, limit })
  res.status(200).json({ contacts, message: 'success' })
}

module.exports = { getContacts }
