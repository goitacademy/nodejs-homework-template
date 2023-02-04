const {
  getContacts,
  getContactById,
  createContact,
  updateContactById,
  toggleFavoriteById,
  deleteContactById,
} = require('../services/contactsService');

const { notFoundError } = require('../helpers/errors');

const getContactsController = async (req, res) => {
  const contacts = await getContacts();

  res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
  const contact = await getContactById(req.params.contactId);

  if (!contact) throw notFoundError;

  res.status(200).json(contact);
};

const createContactController = async (req, res) => {
  const createdContact = await createContact(req.body);

  if (!createdContact) throw notFoundError;

  res.status(201).json(createdContact);
};

const updateContactByIdController = async (req, res) => {
  const updatedContact = await updateContactById(
    req.params.contactId,
    req.body
  );

  if (!updatedContact) throw notFoundError;

  res.status(200).json(updatedContact);
};

const toggleFavoriteByIdController = async (req, res) => {
  const updatedContact = await toggleFavoriteById(
    req.params.contactId,
    req.body
  );

  if (!updatedContact) throw notFoundError;

  res.status(200).json(updatedContact);
};

const deleteContactByIdController = async (req, res) => {
  const deletedContact = await deleteContactById(req.params.contactId);

  if (!deletedContact) throw notFoundError;

  res.status(200).json({ message: 'Contact deleted' });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  toggleFavoriteByIdController,
  deleteContactByIdController,
};
