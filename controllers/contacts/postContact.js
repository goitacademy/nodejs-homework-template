const contactsModel = require('../../models/contacts');

const postContact = async (req, res, next) => {
  const newContact = await contactsModel.addContact(req.body)
  res.status(201).json({ status: "success", code: 201, contact: newContact })
}

module.exports = postContact;