const Contact = require("../models/contact");
const { HttpError } = require("../helper/HttpError");
const ctrlWrapper = require("../decorator/ctrlWrapper");
const Schema = require("../schemas/contact-schemas");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
  next();
};

const getContactsById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.find(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
  next();
};

const updateContact = async (req, res, next) => {
  const { error } = Schema.validate(req.body);
  if (error) {
    throw HttpError(404, message.error);
  }
  const result = await Contact.addContact(req.body);
  res.status(201).json(result);
};
const addContact = async (req, res) => {
  const { error } = Schema.validate(req.body);
  if (error) {
    throw HttpError(404, error.message);
  }
  const { id } = req.params;
  const result = await contacts.updateById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
  next();
};

const removeContacts = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.remove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete contact" });
  next();
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  updateContact: ctrlWrapper(updateContact),
  addContact: ctrlWrapper(addContact),
  removeContacts: ctrlWrapper(removeContacts),
};
