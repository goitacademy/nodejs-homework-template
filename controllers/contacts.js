const { httpError } = require('@root/helpers');
const { ContactModel } = require('@root/models');

async function getAllContacts(req, res, next) {
  const contacts = await ContactModel.find({});

  res.status(200).json(contacts);
}

async function getContactByID(req, res, next) {
  const contact = await ContactModel.findById(req.params.contactId);
  if (!contact) throw httpError(404);

  res.json(contact);
}

async function addContact(req, res, next) {
  const addedContact = await ContactModel.create(req.body);

  res.status(201).json(addedContact);
}

async function deleteContactByID(req, res, next) {
  const deletedContact = await ContactModel.findByIdAndRemove(
    req.params.contactId
  );
  if (!deletedContact) throw httpError(404);

  res.status(200).json({ message: 'contact deleted' });
}

async function updateContact(req, res, next) {
  const updatedContact = await ContactModel.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!updatedContact) throw httpError(404);

  res.status(200).json(updatedContact);
}

async function updateStatus(req, res, next) {
  updateContact(req, res, next);
}

module.exports = {
  getAllContacts,
  getContactByID,
  addContact,
  updateContact,
  deleteContactByID,
  updateStatus,
};
