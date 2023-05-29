const contatctsServices = require('../models/contacts');
const { HttpError } = require('../helpers');

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

const addContatct = async (req, res) => {
  const result = await contatctsServices.addContact(req.body);
  res.status(201).json(result);
};

const deleteContatctById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contatctsServices.removeContact();
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }

  res.json({
    message: 'contact deleted',
  });
};

const updateContatctById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contatctsServices.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContatctById: ctrlWrapper(getContatctById),
  addContatct: ctrlWrapper(addContatct),
  deleteContatctById: ctrlWrapper(deleteContatctById),
  updateContatctById: ctrlWrapper(updateContatctById),
};
