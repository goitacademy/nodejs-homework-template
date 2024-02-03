// const contacts = require('../models/contacts');
const Contact = require('../models/contact')
const { HttpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
  const list = await Contact.find()
  res.json(list);
};

// const getOneContact = async (req, res) => {
//   const {id} = req.params.id
//   const el = await contacts.getContactById(req.params.id);
//   if (!el) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(el);
// };

// const deleteContact = async (req, res) => {
//   const { id } = req.params;
//   const deleteEl = await contacts.removeContact(id);
//   if (!deleteEl) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(deleteEl);
// };

const createContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

// const updateContact = async (req, res) => {
//   const { id } = req.params;
//   const updatedEl = await contacts.updateContact(id, req.body);
//   if (!updatedEl) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(updatedEl);
// };

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  // getOneContact: ctrlWrapper(getOneContact),
  // deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  // updateContact: ctrlWrapper(updateContact),
};
