const contactsMethods = require("../../models/contacts")

const addContact = async (req, res) => {
  const newContact = await contactsMethods.addContact(req.body);
  res.status(201).json(newContact);
}

module.exports = addContact;