const contacts = require("../models/contacts");
const { HttpError, controllerWrapper } = require("../helpers");

const addSchema = require("../schemas/contacts");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await contacts.getContactById(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addCont = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const result = await contacts.removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact removed succesfully",
  });
};

const updateById = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const result = await contacts.updateContact(req.params.contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  addCont: controllerWrapper(addCont),
  updateById: controllerWrapper(updateById),
  deleteById: controllerWrapper(deleteById),
};
