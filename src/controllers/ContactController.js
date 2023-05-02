const {
  addContact,
  removeContact,
  getContactById,
  getContacts,
  updateContact,
  updateStatusContact,
} = require("../services/contactsServices");

const getContactController = async (req, res, next) => {
  const contacts = await getContacts();

  res.status(200).json(contacts);
};

const fetchContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  res.status(200).json({ contact });
};

const createContactController = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contact = await addContact({ name, email, phone });

  res.status(201).json(contact);
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  res.status(200).json(result);
};

const editContactController = async (req, res, next) => {
  const { body } = req;

  const { contactId } = req.params;
  const contact = await updateContact(contactId, body);

  res.status(200).json({ contact });
};

const patchContactController = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;

  const contact = await updateStatusContact(contactId, body);

  res.status(200).json({ contact });
};

module.exports = {
  getContactController,
  fetchContactByIdController,
  createContactController,
  deleteContactController,
  editContactController,
  patchContactController,
};
