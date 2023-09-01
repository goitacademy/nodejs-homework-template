const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../utils');

const findFilter = '-createdAt -updatedAt';

const getContacts = async (req, res) => {
  const result = await Contact.find({});
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id, findFilter);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { body } = req;
  const result = await Contact.create(body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(204).send();
};

const updateFavorite = async (req, res) => {
  const { params, body } = req;
  const { id } = params;
  if (!Object.keys(body).length) {
    throw HttpError(404, 'Missing field favorite');
  }
  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
