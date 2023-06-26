// const contacts = require('../models/contacts.js');
const Contact = require('../models/contact');

const { httpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
  const allContacts = await Contact.find();
  res.json(allContacts);
};

// const getAllContacts = async (req, res) => {
//   const allContacts = await contacts.listContacts();
//   res.json(allContacts);
// };

// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await contacts.getContactById(contactId);
//   if (!contact) {
//     throw httpError(404, 'Not found');
//   }
//   res.json(contact);
// };

// const addContact = async (req, res) => {
//   const newContact = await contacts.addContact(req.body);
//   res.status(201).json(newContact);
// };

// const deleteContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);
//   if (!result) {
//     throw httpError(404, 'Not found');
//   }
//   /* If res.status(204).send() there is no status body */
//   res.status(200).json({ message: 'contact deleted' });
// };

// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.updateContact(contactId, req.body);
//   if (!result) {
//     throw httpError(404, 'Not found');
//   }
//   res.status(200).json(result);
// };

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  // getContactById: ctrlWrapper(getContactById),
  // addContact: ctrlWrapper(addContact),
  // deleteContact: ctrlWrapper(deleteContact),
  // updateContact: ctrlWrapper(updateContact),
};
