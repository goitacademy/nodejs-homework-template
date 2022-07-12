const {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');

const getContactsController = async (req, res, next) => {
  const contacts = await getListContacts();
  res.status(200).json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return res
      .status(404)
      .json({ message: `Not found contact with id '${contactId}'` });
  }
  res.status(200).json({ contact });
};

const addContactController = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contact = await addContact({ name, email, phone });
  res.status(201).json({ contact });
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res
      .status(404)
      .json({ message: `Not found contact with id '${contactId}'` });
  }
  await removeContact(contactId);

  res.status(200).json({ message: 'contact deleted' });
};

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) {
    return res
      .status(404)
      .json({ message: `Not found contact with id '${contactId}'` });
  }

  const updatedContact = await updateContact(contactId, req.body);

  res.status(200).json({ updatedContact });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
};
