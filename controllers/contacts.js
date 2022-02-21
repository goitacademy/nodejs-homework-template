const {
  getContactsModel,
  getContactByIdModel,
  addContactModel,
  updateContactPutModel,
  updateContactPatchModel,
  deleteContactModel,
} = require('../models/contacts');

const getContacts = async (req, res, next) => {
  const contacts = await getContactsModel();
  return res.json({ status: 'success', code: 200, data: { contacts } });
};

const getContactById = async (req, res, next) => {
  const contact = await getContactByIdModel(req.params.contactId);
  return contact
    ? res.json({ status: 'success', code: 200, data: { contact } })
    : res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
};

const addContact = async (req, res, next) => {
  const contact = await addContactModel(req.body);
  return res.status(201).json({ status: 'success', code: 201, data: { contact } });
};

const updateContactPut = async (req, res, next) => {
  const contact = await updateContactPutModel(req.params.contactId, req.body);
  return contact
    ? res.json({ status: 'success', code: 200, data: { contact } })
    : res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
};

const updateContactPatch = async (req, res, next) => {
  const contact = await updateContactPatchModel(req.params.contactId, req.body);
  return contact
    ? res.json({ status: 'success', code: 200, data: { contact } })
    : res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
};

const deleteContact = async (req, res, next) => {
  const contact = await deleteContactModel(req.params.contactId);
  return contact
    ? res.json({ status: 'success', code: 200, message: 'Contact deleted' })
    : res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContactPut,
  updateContactPatch,
  deleteContact,
};
