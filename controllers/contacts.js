const contacts = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
const dataValidator = require("../helpers/dataValidator");
const ctrlWraper = require("../helpers/ctrlWrapper");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const post = async (req, res) => {
  const { error } = dataValidator(req.body);
  if (error) {
    throw HttpError(404, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact has been successfully deleted!",
  });
};

const put = async (req, res) => {
  const { error } = dataValidator(req.body);
  if (error) {
    throw HttpError(404, error.message);
  }

  const { contactId } = req.params;
  const result = await contacts.updateById(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWraper(getAll),
  getById: ctrlWraper(getById),
  post: ctrlWraper(post),
  deleteById: ctrlWraper(deleteById),
  put: ctrlWraper(put),
};
