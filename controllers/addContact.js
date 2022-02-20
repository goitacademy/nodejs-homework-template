const contactsModel = require('../models/contacts')

const addContact = async (req, res, next) => {
  const contact = await contactsModel.addContact(req.body)
   return res.status(201).json({ status: 'success', code: 201, data: { contact } })
}

module.exports = addContact