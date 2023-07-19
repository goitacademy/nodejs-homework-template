const contacts = require("../models/contacts");
const { HttpError, controllerWrapper } = require("../helper");

const getContacts = async (req, res, next) => {
  const response = await contacts.listContacts();
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(response.status).json(response);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const response = await contacts.getContactById(contactId);
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(response.status).json(response);
};

const addContact = async (req, res, next) => {
  const { body } = req;
  const response = await contacts.addContact(body);
  if (!response) {
    throw HttpError(404, "Not Found");
  } else if (response.status === 400) {
    throw HttpError(response.status, response.message);
  }
  res.status(response.status).json(response);
};
const deleteContatcById = async (req, res, next) => {
  const { contactId } = req.params;
  const response = await contacts.removeContact(contactId);
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(response.status).json(response);
};
const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const response = await contacts.updateContact(contactId, body);
  if (!response) {
    throw HttpError(404, "Not Found");
  } else if (response.status === 400) {
    console.log(response.status);
    console.log(response.message);
    throw HttpError(response.status, response.message);
  }
  res.status(response.status).json(response);
};

module.exports = {
  getContacts: controllerWrapper(getContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  deleteContatcById: controllerWrapper(deleteContatcById),
  updateContact: controllerWrapper(updateContact),
};
