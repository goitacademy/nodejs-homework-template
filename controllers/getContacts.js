const { getListContacts } = require('../model/contacts/index')

const getContacts = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contacts = await getListContacts(contactId)
    res.status(200).json({ contacts, message: 'success' })
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = { getContacts }
