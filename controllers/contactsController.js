const {
  listContacts,
  gettingContactById,
  addingContact,
  removingContact,
  updatingContact,
} = require('../models/contactsModel');

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ status: 'success', code: 200, payload: { contacts } });
};

const getContactById = async (req, res, next) => {
  const contact = await gettingContactById(req.params.contactId);
  if (contact) {
    return res
      .status(200)
      .json({ status: 'success', code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not Found' });
};

const addContact = async (req, res, next) => {
  const contact = await addingContact(req.body);
  res.status(201).json({ status: 'success', code: 201, payload: { contact } });
};

const putContact = async (req, res, next) => {
  const contact = await updatingContact(req.params.contactId, req.body);
  if (contact) {
    return res
      .status(200)
      .json({ status: 'success', code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not Found' });
};

const patchContact = async (req, res, next) => {
  const contact = await updatingContact(req.params.contactId, req.body);
  if (contact) {
    return res
      .status(200)
      .json({ status: 'success', code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not Found' });
};

const deleteContact = async (req, res, next) => {
  const contact = await removingContact(req.params.contactId);
  if (contact) {
    return res
      .status(200)
      .json({ status: 'success', code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not Found' });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  putContact,
  patchContact,
  deleteContact,
};
