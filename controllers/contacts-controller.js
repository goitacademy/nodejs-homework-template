const Contact = require('../models/contact');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');
// const { query } = require('express');

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...query } = req.query;
  const skip = (page - 1) * limit;
  const resultList = await Contact.find({ owner, ...query }, '-createdAt -updatedAt', { skip, limit }).populate(
    'owner',
    'email name'
  );
  res.json(resultList);
};

const getContactsById = async (req, res) => {
  const contactId = req.params.contactId;
  const getContactResult = await Contact.findById(contactId);
  if (!getContactResult) {
    throw HttpError(404);
  }
  res.json(getContactResult);
};

const addContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const addContactResult = await Contact.create({ ...req.body, owner });
  res.status(201).json(addContactResult);
};

const updateContacts = async (req, res) => {
  const contactId = req.params.contactId;
  const updateContactResult = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!updateContactResult) {
    throw HttpError(404);
  } else res.json(updateContactResult);
};

const updateContactsFavorite = async (req, res) => {
  const contactId = req.params.contactId;
  const updateContactResult = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
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
