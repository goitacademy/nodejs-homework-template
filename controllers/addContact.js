const contactsModel = require('../models/contacts')

const addContact = async (req, res, next) => {
  const contact = await contactsModel.addContact(req.body)
  if (contact) {
    res.status(201).json({ status: 'success', code: 201, data: { contact } })
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: "Missing required name field" })
}

module.exports = addContact