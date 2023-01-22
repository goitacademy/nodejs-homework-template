const { httpError } = require("@root/helpers");
const contactsOperations = require("@root/models/contacts");

async function getAllContacts(req, res, next) {
  const contacts = await contactsOperations.listContacts();

  res.status(200).json(contacts);
}

async function getContactByID(req, res, next) {
  const contact = await contactsOperations.getContactById(req.params.contactId);

  if (!contact) throw httpError(404);

  res.json(contact);
}

module.exports = {
  getAllContacts,
  getContactByID,
};
