const contactsOperations = require("../../models/contacts");

async function listAll(req, res) {
  const contacts = await contactsOperations.listContacts();
  res.json(contacts);
}

module.exports = listAll;
