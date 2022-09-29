const contactsOperations = require("../../models/contacts");

async function add(req, res) {
  const contact = await contactsOperations.addContact(req.body);
  res.status(201).json(contact);
}

module.exports = add;
