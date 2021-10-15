const { getListContacts } = require('../../model/contacts/index')

const getContacts = async (req, res) => {
  const { _id } = req.user
  const contacts = await getListContacts(_id)
  res.status(200).json({ contacts, message: 'success' })
}

module.exports = { getContacts }
