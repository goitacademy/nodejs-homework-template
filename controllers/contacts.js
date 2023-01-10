const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers")
const { validateBody } = require("../middlewares/Validator");

const getAllContacts = async (req, res, next) => {
  const data = await contacts.listContacts();
  res.json({ data, status: 200 });
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contacts.getContactById(contactId);
  if (!data) {
    throw HttpError(404);
  }
  res.json({ data, status: 200 });
};

const postContact = async (req, res, next) => {
  const { value, error } = validateBody(req.body);
  if (error) {
    throw HttpError(400);
  }

  const result = await contacts.addContact(value);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { value, error } = validateBody(req.body);
  if (error) {
    throw HttpError(400);
  }

  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, value);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const bool = await contacts.removeContact(contactId);
  if (bool === null) {
    res.json({ message: "Not found", status: 404 });
  } else {
    res.json({ message: "Contact deleted", status: 200 });
  }
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
  postContact: ctrlWrapper(postContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
