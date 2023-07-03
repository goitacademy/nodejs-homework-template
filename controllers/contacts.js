// const {
//   getContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require('../models/contacts');

const { Contact } = require('../models/contact');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(contact);
};

const addNew = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(updatedContact);
};

// const deleteById = async (req, res) => {
//   const id = req.params.contactId;
//   const deletedContact = await removeContact(id);
//   if (!deletedContact) {
//     throw HttpError(404, 'Contact not found');
//   }
//   res.json({ message: 'Contact deleted' });
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addNew: ctrlWrapper(addNew),
  updateById: ctrlWrapper(updateById),
  // deleteById: ctrlWrapper(deleteById),
};
