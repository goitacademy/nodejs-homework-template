const Contact = require('../models/contact');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');

const getAllContacts = async (req, res) => {
  const resultList = await Contact.find();
  res.json(resultList);
};

const getContactsById = async (req, res) => {
  const contactId = req.params.contactId;
  const getContactResult = await Contact.findById(contactId);
  if (!getContactResult) {
    throw HttpError(404, `Couldn't find contact witdh id: ${contactId}`);
  }
  res.json(getContactResult);
};

const addContacts = async (req, res) => {
  const addContactResult = await Contact.create(req.body);
  res.status(201).json(addContactResult);
};

const updateContacts = async (req, res) => {
  const contactId = req.params.contactId;
  const updateContactResult = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );
  if (!updateContactResult) {
    throw HttpError(404);
  } else res.json(updateContactResult);
};

const updateContactsFavorite = async (req, res) => {
  const contactId = req.params.contactId;
  const updateContactResult = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );
  if (!updateContactResult) {
    throw HttpError(404);
  } else res.json(updateContactResult);
};

const deleteContacts = async (req, res) => {
  const contactId = req.params.contactId;
  const deleteContactResult = await Contact.findByIdAndDelete(contactId);
  if (deleteContactResult === null) {
    throw HttpError(404);
  } else res.status(200).json({ message: 'contact deleted' });
};
module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addContacts: ctrlWrapper(addContacts),
  deleteContacts: ctrlWrapper(deleteContacts),
  updateContacts: ctrlWrapper(updateContacts),
  updateContactsFavorite: ctrlWrapper(updateContactsFavorite),
};
