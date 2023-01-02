const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');
const { HttpError } = require('../helpers/index');

const getContacts = async (req, res, next) => {
  const contactsList = await listContacts();
  res.json(contactsList);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contactItem = await getContactById(contactId);

  if (!contactItem) {
    return next(HttpError(404, `Contact with id:${contactId} not found`));
  }
  return res.json(contactItem);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contactItem = await getContactById(contactId);

  if (!contactItem) {
    return next(HttpError(404, `Contact with id:${contactId} not found`));
  }
  await removeContact(contactId);
  return res.status(200).json(contactItem);
};

const addNewContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact({ name, email, phone });
  res.status(201).json(newContact);
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);

  if (!updatedContact) {
    return next(HttpError(404, `Contact with id:${contactId} not found`));
  } else {
    res.status(200).json(updatedContact);
  }
};

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  addNewContact,
  updateContactById,
};
