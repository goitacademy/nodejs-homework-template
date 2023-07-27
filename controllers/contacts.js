const { ctrlWrapper } = require('../helpers');
const { HttpError } = require('../helpers');
const { Contact } = require('../models/contact');

const listContacts = async (_, res) => {
 const contacts = await Contact.find({}, '-createdAt -updatedAt');
 res.json(contacts);
};

const getContactById = async (req, res) => {
 const response = await Contact.findById(req.params.contactId, '-createdAt -updatedAt');
 if (!response) {
  throw HttpError(404, 'Not Found');
 }
 res.status(200).json(response);
};

const addContact = async (req, res) => {
 const newContact = await Contact.create(req.body);

 if (!newContact) {
  throw HttpError(404, 'Unable to add contact');
 }
 res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
 const response = await Contact.findByIdAndRemove(req.params.contactId);
 if (!response) {
  throw HttpError(404, 'Not Found');
 }
 res.status(200).json({ message: 'contact deleted' });
};

const updateContact = async (req, res) => {
 const updatedContact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {
  new: true,
 });
 if (!updatedContact) {
  throw HttpError(404, 'Not Found');
 }
 res.status(200).json(updatedContact);
};

const updateFavorite = async (req, res) => {
 const updatedContact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {
  new: true,
 });
 if (!updatedContact) {
  throw HttpError(404, 'Not Found');
 }
 res.status(200).json(updatedContact);
};

module.exports = {
 listContacts: ctrlWrapper(listContacts),
 getContactById: ctrlWrapper(getContactById),
 addContact: ctrlWrapper(addContact),
 removeContact: ctrlWrapper(removeContact),
 updateContact: ctrlWrapper(updateContact),
 updateFavorite: ctrlWrapper(updateFavorite),
};
