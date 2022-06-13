const contactsModel = require('../models/contacts')

const updateContact = async (req, res, next) => {
  const contact = await contactsModel.updateContact(req.params.contactId, req.body)
  if (contact) {
    return res.json({ status: 'success', code: 200, data: { contact } })
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not Found' })
}

  module.exports = updateContact