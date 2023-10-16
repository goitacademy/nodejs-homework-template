const contactsService = require("../models/contacts");

const HttpError = require("../helpers");

const decorators = require("../decorators");

const getAll = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({
    message: "Delete success",
  });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

module.exports = {
  getAll: decorators.ctrlWrapper(getAll),
  getById: decorators.ctrlWrapper(getById),
  add: decorators.ctrlWrapper(add),
  deleteById: decorators.ctrlWrapper(deleteById),
  updateById: decorators.ctrlWrapper(updateById),
};
