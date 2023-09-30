const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require("../decorators/ctrlWrapper.js");
const contactsService = require("../models/contacts.js");

const getAll = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  console.log("req:", req.body);
  const { contactId } = req.params;
  console.log("contactId:", contactId);

  const result = await contactsService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }

  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
