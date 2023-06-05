const contatctsServices = require('../models/contacts');
const { HttpError } = require('../helpers');
const { contatctsSchema } = require('../schemas');
const { ctrlWrapper } = require('../decorators');

const getAllContacts = async (req, res) => {
  const result = await contatctsServices.listContacts();
  res.json(result);
};

const getContatctById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contatctsServices.getContactById(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = contatctsSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing required name field');
  }
  const result = await contatctsServices.addContact(req.body);
  res.status(201).json(result);
};

const deleteContatctById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contatctsServices.removeContact(contactId);
  if (!result) {
    throw HttpError(404, 'Not found!');
  }

  res.json({
    message: 'contact deleted',
  });
};

const updateContatctById = async (req, res) => {
  const { contactId } = req.params;
  // const { error } = contatctsSchema.validate(req.body);
  const result = await contatctsServices.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, 'Not found!');
  }
  // if (error) {
  //   throw HttpError(400, 'missing fields');
  // }

  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContatctById: ctrlWrapper(getContatctById),
  addContatct: ctrlWrapper(addContact),
  deleteContatctById: ctrlWrapper(deleteContatctById),
  updateContatctById: ctrlWrapper(updateContatctById),
};
