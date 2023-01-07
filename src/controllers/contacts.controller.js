const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const contacts = await getContacts();
  return res.json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) return res.json(contact);

  next();
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) return next();
  res.json({ message: `contact ${contact.name} is deleted` });
};

const addContactController = async (req, res) => {
  const contact = await addContact(req.body);
  res.status(201).json(contact);
};

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);

  if (!updatedContact) return next();
  const contact = await getContactById(contactId);
  res.json(contact);
};

// const updateStatusContactController = async (req, res, next) => {
//   const { contactId } = req.params;
//   const updatedContact = await updateContact(contactId, req.body);
//   if (!updatedContact) return next();
//   const contact = await getContactById(contactId);
//   res.json(contact);
// };

module.exports = {
  getContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  // updateStatusContactController,
};
