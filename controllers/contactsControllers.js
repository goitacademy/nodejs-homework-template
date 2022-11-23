const { throwParameterError } = require('../helpers/apiHelpers');

const {
  getContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
  changeContactFavoriteStatus,
} = require('../service/contactsServices');

const getAllContacts = async (_, res) => {
  res.status(200).json({ contacts: await getContacts() });
};

const getContactById = async ({ params: { contactId } }, res) => {
  const contact = await getContact(contactId);
  if (!contact) return throwParameterError(contactId);
  res.status(200).json({ contact });
};

const addNewContact = async (req, res) => {
  res.status(201).json({ contact: await addContact(req.body) });
};

const deleteContactById = async ({ params: { contactId } }, res) => {
  const contact = await removeContact(contactId);
  if (!contact) return throwParameterError(contactId);
  res.status(200).json({ message: 'contact deleted' });
};

const updateContactById = async ({ params: { contactId }, body }, res) => {
  const contact = await updateContact(contactId, body);
  if (!contact) return throwParameterError(contactId);
  res.status(200).json({ contact });
};

const updateStatusContact = async ({ body, params: { contactId } }, res) => {
  const contact = await changeContactFavoriteStatus(contactId, body);
  if (!contact) return throwParameterError(contactId);
  res.status(200).json({ contact });
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContactById,
  addNewContact,
  updateContactById,
  updateStatusContact,
};
