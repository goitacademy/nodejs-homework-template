const { httpError } = require('@root/helpers');
const contactsOperations = require('@root/models/contacts');

async function getAllContacts(req, res, next) {
  // const contacts = await contactsOperations.listContacts();
  // res.status(200).json(contacts);
}

async function getContactByID(req, res, next) {
  // const contact = await contactsOperations.getContactById(req.params.contactId);
  // if (!contact) throw httpError(404);
  // res.json(contact);
}

async function addContact(req, res, next) {
  // const addedContact = await contactsOperations.addContact(req.body);
  // res.status(201).json(addedContact);
}

async function deleteContactByID(req, res, next) {
  // const deletedContact = await contactsOperations.removeContact(
  // req.params.contactId
  // );
  // if (!deletedContact) throw httpError(404);
  // res.status(200).json({ message: "contact deleted" });
}

async function updateContact(req, res, next) {
  // const updatedContact = await contactsOperations.updateContact(
  // req.params.contactId,
  // req.body
  // );
  // if (!updatedContact) throw httpError(404);
  // res.status(200).json(updatedContact);
}

module.exports = {
  getAllContacts,
  getContactByID,
  addContact,
  updateContact,
  deleteContactByID,
};
