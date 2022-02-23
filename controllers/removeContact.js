const contactsModel = require('../models/contacts')

const removeContact = async (req, res, next) => {
  const contact = await contactsModel.removeContact(req.params.contactId, req.body)
  if (contact) {
    return res.json({ status: 'success', code: 200, data: { contact }, message: "contact deleted" })
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not Found' })
}

module.exports = removeContact